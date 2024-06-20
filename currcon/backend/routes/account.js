const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware");
const { Person, Wallet } = require("../db");
const zod = require("zod");

const exchangeRates = {
    USD: { USD: 1, INR: 83.62, AED: 3.67, Pound: 0.79 },
    INR: { USD: 0.012, INR: 1, AED: 0.044, Pound: 0.0094 },
    AED: { USD: 0.27, INR: 22.77, AED: 1, Pound: 0.21 },
    Pound: { USD: 1.27, INR: 106.21, AED: 4.67, Pound: 1 }
};

// Fetch user wallet details
router.get("/", authmiddleware, async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ userId: req.userId });
        const user = await Person.findById(req.userId);

        if (!wallet || !user) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.json({
            balance: wallet.totalbalance,
            USD: wallet.USD,
            INR: wallet.INR,
            AED: wallet.AED,
            Pound: wallet.Pound,
            username: user.username,
            Firstname: user.Firstname,
            Lastname: user.Lastname
        });
    } catch (error) {
        return res.status(500).json({ msg: "Server error", error });
    }
});

// Schema for deposit and withdrawal requests
const transactionSchema = zod.object({
    curr: zod.string().min(1),
    amount: zod.number().positive()
});

// Handle deposits
router.put("/deposit", authmiddleware, async (req, res) => {
    const result = transactionSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(411).json({ msg: "Incorrect inputs" });
    }

    const { curr, amount } = result.data;

    try {
        const user = await Person.findById(req.userId);
        const wallet = await Wallet.findOne({ userId: req.userId });

        if (!user || !wallet) {
            return res.status(404).json({ msg: "User or wallet not found" });
        }

        wallet[curr] = wallet[curr] + amount;
        wallet[curr]=parseFloat(wallet[curr].toFixed(2))
        if (curr === "USD") {
            wallet.totalbalance += amount * exchangeRates.USD.INR;
        } else if (curr === "INR") {
            wallet.totalbalance += amount;
        } else if (curr === "Pound") {
            wallet.totalbalance += amount * exchangeRates.Pound.INR;
        } else if (curr === "AED") {
            wallet.totalbalance += amount * exchangeRates.AED.INR;
        }

        wallet.totalbalance = parseFloat(wallet.totalbalance.toFixed(5));
        await wallet.save();

        return res.status(200).json({ msg: "Deposit successful" });
    } catch (error) {
        return res.status(500).json({ msg: "Server error", error });
    }
});

// Handle withdrawals
router.put("/withdraw", authmiddleware, async (req, res) => {
    const result = transactionSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ msg: "Incorrect inputs" });
    }

    const { curr, amount } = result.data;

    try {
        const user = await Person.findById(req.userId);
        const wallet = await Wallet.findOne({ userId: req.userId });

        if (!user || !wallet) {
            return res.status(404).json({ msg: "User or wallet not found" });
        }

        if (wallet[curr] < amount) {
            return res.status(411).json({ msg: "Insufficient balance" });
        }

        wallet[curr] -= amount;
        wallet[curr]=parseFloat(wallet[curr].toFixed(5))
        if (curr === "USD") {
          wallet.totalbalance -= amount * exchangeRates.USD.INR;
      } else if (curr === "INR") {
          wallet.totalbalance -= amount;
      } else if (curr === "Pound") {
          wallet.totalbalance -= amount * exchangeRates.Pound.INR;
      } else if (curr === "AED") {
          wallet.totalbalance -= amount * exchangeRates.AED.INR;
      }
      wallet.totalbalance = parseFloat(wallet.totalbalance.toFixed(5));
        await wallet.save();

        return res.status(200).json({ msg: "Withdrawal successful" });
    } catch (error) {
        return res.status(500).json({ msg: "Server error", error });
    }
});

module.exports = router;
