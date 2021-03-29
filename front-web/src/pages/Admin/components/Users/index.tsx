import { Route, Switch } from "react-router";
import Form from "./Form";
import ListUsers from "./List";


const AdminUsers = () => {

    return (
        <div>
            <Switch>
                <Route path="/admin/users" exact>
                    <ListUsers />
                </Route>
                <Route path="/admin/users/:userId">
                    <Form />
                </Route>
            </Switch>
        </div>
    );

}

export default AdminUsers;