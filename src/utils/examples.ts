export interface CodeExample {
  id: string;
  name: string;
  description: string;
  css: string;
  html: string; // The HTML skeleton that matches the styles
}

export const examples: CodeExample[] = [
  {
    id: 'modern-button',
    name: 'Modern Button',
    description: 'A premium call-to-action button with hover transitions and focus states.',
    css: `.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background-color: #3b82f6;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #2563eb;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  background-color: #2563eb;
  box-shadow: 0 6px 8px -1px rgba(37, 99, 235, 0.4);
}

.btn-primary:active {
  background-color: #1d4ed8;
}`,
    html: `<button class="btn-primary">
  Get Started Now
</button>`
  },
  {
    id: 'glass-card',
    name: 'Glassmorphic Card',
    description: 'A beautiful modern card component using gradient background and borders.',
    css: `.card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(229, 231, 235, 0.5);
  border-radius: 16px;
  width: 320px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 14px;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 16px;
}

.card-tag {
  display: inline-block;
  align-self: flex-start;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  background-color: #ecfdf5;
  color: #047857;
  border-radius: 9999px;
}`,
    html: `<div class="card">
  <span class="card-tag">New Feature</span>
  <h3 class="card-title">Explore Tailwind CSS</h3>
  <p class="card-desc">
    Learn how utility classes speed up development times and result in smaller CSS bundles.
  </p>
</div>`
  },
  {
    id: 'login-form',
    name: 'Profile Card / Form',
    description: 'A professional user input profile card form layout using Flexbox.',
    css: `.profile-form {
  display: flex;
  flex-direction: column;
  width: 380px;
  padding: 32px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.label {
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  margin-bottom: 6px;
}

.input-field {
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
  color: #0f172a;
  background-color: #f8fafc;
}

.input-field:focus {
  border-color: #3b82f6;
  background-color: #ffffff;
  outline: none;
}`,
    html: `<div class="profile-form">
  <div class="form-group">
    <label class="label">Email Address</label>
    <input type="email" class="input-field" placeholder="you@example.com" />
  </div>
</div>`
  }
];
