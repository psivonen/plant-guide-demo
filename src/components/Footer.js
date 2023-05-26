export const Footer = () => {
    return (
        <div className="text-center p-3 fixed-bottom" style={{background: 'white'}}>
            <p>&copy; {new Date().getFullYear()} Plant Guide</p>
        </div>
    )
}