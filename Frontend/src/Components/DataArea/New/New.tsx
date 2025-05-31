import "./New.css";

export function New() {
    return (
        <div className="New">
			<p>New...</p>
        </div>
    );

//     <div className="New">
//     <form onSubmit={handleSubmit(send)}>
//     <div className="scrollable-container">
//         <label>Gift Name: </label>
//         <input type="text" {...register("name")} required></input>

//         <label>Target: </label>
//         <select {...register("targetId")} defaultValue="" required>
//             <option disabled value="">Please Select Target</option>
//             {targets.map(t => (
//                 <option key={t.id} value={t.id}>{t.name}</option>
//             ))}
//         </select>

//         <label>Description: </label>
//         <textarea {...register("description")} required></textarea>

//         <label>Price:</label>
//         <input type="number" step="0.01" {...register("price")} required min={0} max={999.99}></input>

//         <label>Discount:</label>
//         <input type="number" {...register("discount")} required min={0} max={100}></input>

//         </div>
//         <button>Send</button>

//     </form>
// </div>
}
