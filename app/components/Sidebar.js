import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #ccc' }}>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link href="/editor">Page Builder</Link></li>
          <li><Link href="/blogs">Blogs</Link></li>
          <li><Link href="/settings">Settings</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;