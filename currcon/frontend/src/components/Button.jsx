

export default function Button({label,onClick}){

    return <div>
        <button onClick={onClick} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 font-medium border rounded-full px-5 py-1 me-2 mt-3">{label}</button>
    </div>
}