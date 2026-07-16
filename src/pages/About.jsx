import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '70px' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', color: '#fff', letterSpacing: '-1px' }}>
          More Than Just a Dealership.
        </h1>
        <p style={{ color: '#888', fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
          At RIDECRAFT, we live and breathe motorcycles. Our mission is to connect riders with the ultimate machines, delivering an elite, fully-digital purchasing experience.
        </p>
      </div>

      {/* Image / Story Split */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', marginBottom: '70px', alignItems: 'center' }}>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Motorcycle on open road" 
            style={{ width: '100%', borderRadius: '15px', border: '1px solid #333', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
          />
        </div>
        <div>
          <div style={{ display: 'inline-block', background: '#e6394622', color: '#e63946', padding: '5px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '15px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Our Story
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '20px', color: '#fff' }}>Built for the bold.</h2>
          <p style={{ color: '#aaa', lineHeight: '1.8', marginBottom: '15px', fontSize: '1.05rem' }}>
            Founded by riders, for riders. RIDECRAFT started with a simple vision: buying a premium motorcycle shouldn't be a hassle. It should be exactly as thrilling as the ride itself. 
          </p>
          <p style={{ color: '#aaa', lineHeight: '1.8', fontSize: '1.05rem' }}>
            We have completely revolutionized the industry by offering a seamless online garage, state-of-the-art secure payment gateways, and a curated inventory of the world's most sought-after bikes—delivered straight to your driveway.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-around', background: 'linear-gradient(135deg, #121215 0%, #0a0a0c 100%)', padding: '50px 20px', borderRadius: '15px', border: '1px solid #222', marginBottom: '70px' }}>
        <div style={{ textAlign: 'center', flex: '1 1 200px' }}>
          <h3 style={{ fontSize: '3rem', color: '#e63946', margin: '0 0 10px 0' }}>15+</h3>
          <p style={{ color: '#888', margin: 0, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Premium Brands</p>
        </div>
        <div style={{ textAlign: 'center', flex: '1 1 200px' }}>
          <h3 style={{ fontSize: '3rem', color: '#e63946', margin: '0 0 10px 0' }}>10k+</h3>
          <p style={{ color: '#888', margin: 0, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Bikes Delivered</p>
        </div>
        <div style={{ textAlign: 'center', flex: '1 1 200px' }}>
          <h3 style={{ fontSize: '3rem', color: '#e63946', margin: '0 0 10px 0' }}>24/7</h3>
          <p style={{ color: '#888', margin: 0, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Expert Support</p>
        </div>
      </div>

      {/* Call to Action */}
      <div style={{ textAlign: 'center', background: '#121215', padding: '60px 20px', borderRadius: '15px', border: '1px solid #222' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>Ready to find your dream ride?</h2>
        <p style={{ color: '#888', marginBottom: '30px' }}>Browse our featured inventory and add a masterpiece to your garage today.</p>
        <Link to="/" style={{ display: 'inline-block', background: '#e63946', color: '#fff', padding: '15px 40px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', transition: 'transform 0.2s' }}>
          Explore the Shop
        </Link>
      </div>

    </div>
  );
}