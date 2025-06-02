import "./List.css";

export function List() {
    return (
        <div className="List">
            test
            {/* <div className="form">
                <label>Select Products Category: </label>
                <select defaultValue="" required onChange={displayProducts}>
                    <option disabled value="">Please Select Category</option>
                    {categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>
            <div>
                {products.map(p=> <ProductCard key={p._id} product={p} deleteCard={deleteProduct} editCard={editProduct} />)}
            </div> */}
        </div>
    );
}
