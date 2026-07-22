function Dashboard() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    return (

        <div>

            <h1>Dashboard</h1>

            <h3>

                Bienvenido {user?.nombre}

            </h3>

        </div>

    );

}

export default Dashboard;