import { useProductContext } from '../ProductContext';

function DashboardGuest() {
  const { products} = useProductContext();
  return (
    <div style={{ marginBottom: '500px' }}>
      <div className='title_div'>
        <p style={{ fontFamily: 'helvetica', fontSize: '3em' }}>Dashboard</p>
      </div>

      <div className="tasks-container">
        {products.map(product => (
          <div key={product.id} className="task">
            <p className='task_title'>{product.title}</p>
            <p className='primary_lbl'>{product.description}</p>
            <p className='primary_lbl'>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardGuest;
