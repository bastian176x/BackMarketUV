import React, { useState, useEffect } from "react";
import appFirebase from "../credenciales";
import { getDatabase, ref, onValue, update, push, set } from "firebase/database";

const database = getDatabase(appFirebase);

const Admin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRef = ref(database, "products/");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const pendingProducts = [];

      for (let id in data) {
        if (data[id].status === "pending") {
          pendingProducts.push({ id, ...data[id] });
        }
      }

      setProducts(pendingProducts);
    });
  }, []);

  const handleApprove = (id, userId) => {
    const productRef = ref(database, `products/${id}`);
    update(productRef, { status: "approved" })
      .then(() => {
        // Añadir una notificación
        const newNotificationRef = push(ref(database, 'notifications'));
        return set(newNotificationRef, {
          userId: userId,
          message: `Your product ${id} has been approved.`,
          timestamp: Date.now()
        });
      })
      .then(() => {
        alert("Product approved and notification sent");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  const handleReject = (id) => {
    const productRef = ref(database, `products/${id}`);
    update(productRef, { status: "rejected" });
  };

  return (
    <div className="container">
      <h1>Pending Products</h1>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <strong>{product.productName}</strong>: {product.productDescription}
                  {product.imageUrl && (
                    <img src={product.imageUrl} alt={product.productName} style={{ width: "100px" }} />
                  )}
                  <div className="btn-group mt-2">
                    <button
                      className="btn btn-success"
                      onClick={() => handleApprove(product.id, product.userId)}
                    >
                      Aprobar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(product.id)}
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No pending products available</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
