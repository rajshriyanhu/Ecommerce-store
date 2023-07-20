const Loader = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full backdrop-filter backdrop-blur-sm flex justify-center items-center bg-transparent bg-opacity-50">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
        </div>
    )
}

export default Loader