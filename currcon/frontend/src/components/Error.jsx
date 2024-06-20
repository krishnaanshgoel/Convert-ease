
export default function Error({error,msg}) {
    if({error}==true){
        return(
            <div className="text-lg text-center text-red-600 font-bold">
                {msg}
            </div>
        )
    }
    else{
        return (<></>)
    }
}
