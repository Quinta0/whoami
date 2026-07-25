export default function NotFound() {
  return (
    <div style={{minHeight:'100dvh',display:'flex',flexDirection:'column',justifyContent:'center',maxWidth:'var(--container)',margin:'0 auto',padding:'0 var(--pad)'}}>
      <div className="status-row"><span className="green-dot"></span>404</div>
      <div className="hero-name">Page not<br/>found.</div>
      <p className="hero-lead">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
      <div className="btns">
        <a href="/" className="btn btn-d">Back to home</a>
      </div>
    </div>
  )
}
