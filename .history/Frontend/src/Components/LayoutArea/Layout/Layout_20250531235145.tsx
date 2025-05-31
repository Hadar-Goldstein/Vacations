import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout() {
    return (
        <div className="Layout">
            <aside>
                <Menu />
            </aside>
            <main>
                <Routing />
            </main>
        </div>
    );
}
