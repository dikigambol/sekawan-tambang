const tableAddOns = (val) => {
    return (
        <tr>
            <td className='text-center' colSpan={9}>
                {
                    val === 'loading' ?
                        <div id="spinner" className="loader-1 colorful mt-5 mb-5">
                            <div className="dot" />
                            <div className="dot" />
                            <div className="dot" />
                        </div>
                        : '-- Tidak Ada Data --'
                }
            </td>
        </tr>
    )
}

export default tableAddOns