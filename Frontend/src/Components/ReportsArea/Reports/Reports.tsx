import { useSelector } from "react-redux";
import "./Reports.css";
import { AppState } from "../../../Redux/Store";
import { VacationModel } from "../../../Models/VacationModel";
import { useEffect } from "react";
import { notify } from "../../../Utils/Notify";
import { dataService } from "../../../Services/DataService";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from 'victory';
import { CSVLink } from "react-csv";
import { UserModel } from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";

export function Reports(): JSX.Element {

    const vacations = useSelector<AppState, VacationModel[]>(store => store.vacations);
    const user = useSelector<AppState, UserModel>(store => store.user);
    const navigate = useNavigate();

    async function fetchData() {
        try {
            await dataService.getAllVacations();
        }
        catch (err: any) {
            notify.error(err.message);
        }
    }

    useEffect(() => {
        if (!user) navigate("/unauthorized");
        else fetchData();
    }, [user]);

    const splitText = (text: string): string => {
        return text.split(" ").join("\n");
    };


    const data = vacations.map(v => ({ x: splitText(v.destination), y: v.likesCount }));
    const chartWidth = Math.max(800, vacations.length * 80);

    const headers = [
        { label: "Destination", key: "destination" },
        { label: "Likes", key: "likesCount" }
    ];

    const csvData = vacations.map(v => ({
        destination: v.destination,
        likesCount: v.likesCount
    }));


    return (
        <div className="Reports">
            <CSVLink data={csvData} headers={headers} filename="vacations_report.csv" className="csv-button">Export CSV</CSVLink>
            <div className="reports-scroll">
                <h2 className="reports-title">Vacations Report</h2>
                <div style={{ minWidth: chartWidth }} >
                    <VictoryChart width={chartWidth} domainPadding={{ x: 100 }} padding={{ top: 50, right: 40, bottom: 60, left: 60 }} >
                        <VictoryAxis
                            style={{
                                tickLabels: {
                                    angle: 0,
                                    fontSize: 12,
                                    padding: 10,
                                    lineHeight: 1.5
                                }
                            }}
                        />
                        <VictoryAxis dependentAxis tickFormat={(t) => Number.isInteger(t) ? t : null} />
                        <VictoryBar data={data} style={{ data: { fill: "#e88" } }} labels={({ datum }) => `${datum.x.replace(/\n/g, " ")}\n${datum.y} Likes`}

                            labelComponent={<VictoryTooltip
                                flyoutStyle={{ fill: "white", stroke: "#e88" }}
                                style={{ fontSize: 12, fill: "#444" }}
                                cornerRadius={5}
                                pointerLength={10}
                            />} />
                    </VictoryChart>
                </div>
            </div>
        </div>

    );
}
