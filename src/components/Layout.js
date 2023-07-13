

function Layout({ children }) {

    return (
        <section>
            <div className="container">
                <main>{children}</main>
            </div>
        </section>
    )
}

export default Layout