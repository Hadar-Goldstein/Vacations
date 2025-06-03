import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout() {
    return (
        <div className="Layout">
            <main>
                < Menu />
                <Routing />
            </main>
        </div>
    );
}
