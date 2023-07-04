
export default function ButtonGame({values, onClick}){
    return (
        <button
            className = {`${values.class} flex justify-center items-center bg-[#dcdcdc] h-11 w-32 text-black hover:text-red-500 shadow-[0_1px_1px_black] focus:shadow-[inset_1px_1px_black] text-sm font-bold no-underline border-2 border-red-400 `}
            onClick = {onClick}>
            {values.content}
        </button>
    )
}