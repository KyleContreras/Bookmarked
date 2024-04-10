import CreateAccount from "./CreateAccount.tsx";
import Login from "./Login.tsx";
import LogoutButton from "./LogoutButton.tsx";

function AccountPage() {
    return (
        <div>
            <h2>Account</h2>
            <div className="container-fluid">
                <CreateAccount />
                <Login  />
                <LogoutButton />
            </div>
        </div>
    );
}

export default AccountPage;
