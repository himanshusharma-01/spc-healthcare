export const zohoFormHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Website Inquiry – SPC Healthcare</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>

  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --navy:  #0b1f3a;
      --navy2: #112d52;
      --teal:  #0e7f7f;
      --teal2: #0ab5b5;
      --cream: #f4f1ec;
      --white: #ffffff;
      --grey:  #8a95a3;
      --border:#d4dde6;
      --font-display: 'Cormorant Garamond', serif;
      --font-body:    'DM Sans', sans-serif;
    }

    body {
      min-height: 100vh;
      background: var(--cream);
      font-family: var(--font-body);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 16px;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .card {
      background: var(--white);
      border-radius: 20px;
      overflow: hidden;
      width: 100%;
      max-width: 560px;
      box-shadow: 0 24px 80px rgba(11,31,58,0.13), 0 4px 16px rgba(11,31,58,0.06);
      animation: fadeUp 0.5s ease both;
    }

    .card-header {
      background: linear-gradient(135deg, var(--navy) 0%, var(--navy2) 60%, #1a4a72 100%);
      padding: 40px 40px 32px;
      position: relative;
      overflow: hidden;
    }
    .card-header::before {
      content: '';
      position: absolute;
      top: -40px; right: -40px;
      width: 180px; height: 180px;
      border-radius: 50%;
      background: rgba(14,127,127,0.18);
    }
    .card-header::after {
      content: '';
      position: absolute;
      bottom: -20px; left: 30px;
      width: 100px; height: 100px;
      border-radius: 50%;
      background: rgba(255,255,255,0.04);
    }
    .header-tag {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: var(--teal2);
      margin-bottom: 10px;
      position: relative;
      z-index: 1;
    }
    .header-title {
      font-family: var(--font-display);
      font-size: 34px;
      font-weight: 600;
      color: var(--white);
      line-height: 1.15;
      position: relative;
      z-index: 1;
    }
    .header-sub {
      margin-top: 10px;
      font-size: 13.5px;
      color: rgba(255,255,255,0.6);
      font-weight: 300;
      position: relative;
      z-index: 1;
    }
    .header-line {
      width: 40px; height: 3px;
      background: var(--teal2);
      border-radius: 2px;
      margin-top: 18px;
      position: relative;
      z-index: 1;
    }

    .card-body { padding: 36px 40px 32px; }

    .field-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }
    .field-group { margin-bottom: 22px; }

    label {
      display: block;
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--navy);
      margin-bottom: 7px;
    }
    label .req { color: var(--teal); margin-left: 2px; }

    input[type='text'],
    textarea {
      width: 100%;
      font-family: var(--font-body);
      font-size: 14px;
      color: var(--navy);
      background: #f8fafc;
      border: 1.5px solid var(--border);
      border-radius: 10px;
      padding: 12px 16px;
      outline: none;
      transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
      -webkit-appearance: none;
    }
    input[type='text']:focus,
    textarea:focus {
      border-color: var(--teal);
      background: var(--white);
      box-shadow: 0 0 0 3px rgba(14,127,127,0.1);
    }
    input[type='text'].manfieldbdr,
    textarea.manfieldbdr {
      border-left: 3px solid var(--teal);
    }
    input[type='text']::placeholder,
    textarea::placeholder {
      color: #b8c3cc;
      font-weight: 300;
    }
    textarea { resize: vertical; min-height: 120px; }

    .btn-row { display: flex; gap: 12px; margin-top: 6px; }

    .btn-submit {
      flex: 1;
      background: linear-gradient(135deg, var(--teal) 0%, var(--teal2) 100%);
      color: var(--white);
      border: none;
      border-radius: 10px;
      padding: 14px 24px;
      font-family: var(--font-body);
      font-size: 13.5px;
      font-weight: 600;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
      box-shadow: 0 6px 24px rgba(14,127,127,0.3);
    }
    .btn-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 32px rgba(14,127,127,0.38);
    }
    .btn-submit:active { transform: translateY(0); }
    .btn-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

    .btn-reset {
      background: transparent;
      color: var(--grey);
      border: 1.5px solid var(--border);
      border-radius: 10px;
      padding: 14px 20px;
      font-family: var(--font-body);
      font-size: 13.5px;
      font-weight: 500;
      cursor: pointer;
      transition: border-color 0.2s, color 0.2s;
    }
    .btn-reset:hover { border-color: var(--navy); color: var(--navy); }

    .card-footer {
      border-top: 1px solid #edf1f5;
      padding: 14px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fafbfc;
    }
    .footer-brand { font-size: 11px; color: var(--grey); }
    .footer-brand strong { color: var(--navy); font-weight: 600; }
    .powered {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      color: #b0bac5;
      text-decoration: none;
    }
    .powered img { width: 14px; height: 14px; opacity: 0.6; }

    @media (max-width: 520px) {
      .card-header, .card-body, .card-footer { padding-left: 24px; padding-right: 24px; }
      .field-row { grid-template-columns: 1fr; }
      .header-title { font-size: 26px; }
    }
  </style>
</head>
<body>

<div class="card">

  <div class="card-header">
    <div class="header-tag">SPC Healthcare</div>
    <div class="header-title">Website Inquiry</div>
    <div class="header-sub">We'll get back to you within 1 business day.</div>
    <div class="header-line"></div>
  </div>

  <form
    name="zsWebToCase_24260000008253001"
    id="zsWebToCase_24260000008253001"
    action="https://desk.zoho.in/support/WebToCase"
    method="POST"
    enctype="multipart/form-data"
    target="_blank"
  >
    <input type="hidden" name="xnQsjsdp" value="edbsn81fee833e1018811b554111894ef0882"/>
    <input type="hidden" name="xmIwtLD"  value="edbsn733dc34fa572aa5626a043f1b0fa74b5d189a5a048ee40669e06ce8d664e1661"/>
    <input type="hidden" name="xJdfEaS" value=""/>
    <input type="hidden" name="actionType" value="Q2FzZXM="/>
    <input type="hidden" id="property(module)" value="Cases"/>
    <input type="hidden" id="dependent_field_values_Cases" value='{"JSON_VALUES":{},"JSON_SELECT_VALUES":{},"JSON_MAP_DEP_LABELS":[]}'/>
    <input type="hidden" name="returnURL" value="https://spchealthcare.com/"/>

    <div class="card-body">

      <div class="field-row">
        <div class="field-group">
          <label for="f-name">Name <span class="req">*</span></label>
          <input type="text" id="f-name" name="Contact Name" maxlength="120" class="manfieldbdr" placeholder="Full name"/>
        </div>
        <div class="field-group">
          <label for="f-email">Email <span class="req">*</span></label>
          <input type="text" id="f-email" name="Email" maxlength="120" class="manfieldbdr" placeholder="you@example.com"/>
        </div>
      </div>

      <div class="field-row">
        <div class="field-group">
          <label for="f-phone">Phone</label>
          <input type="text" id="f-phone" name="Phone" maxlength="120" placeholder="+91 XXXXX XXXXX"/>
        </div>
        <div class="field-group">
          <label for="f-city">City <span class="req">*</span></label>
          <input type="text" id="f-city" name="Subject" maxlength="255" class="manfieldbdr" placeholder="Your city"/>
        </div>
      </div>

      <div class="field-group">
        <label for="f-msg">Message</label>
        <textarea id="f-msg" name="Description" maxlength="3000" placeholder="Tell us how we can help you…"></textarea>
      </div>

      <div class="btn-row">
        <button type="submit" id="zsSubmitButton_24260000008253001" class="btn-submit">
          Send Inquiry →
        </button>
        <button type="reset" class="btn-reset">Reset</button>
      </div>

    </div>
  </form>

  <div class="card-footer">
    <span class="footer-brand"><strong>SPC Healthcare</strong> — Secure. Pure. Cure.</span>
    <a href="https://zoho.in/desk" target="_blank" rel="noopener noreferrer" class="powered">
      powered by
      <img src="https://static.zohocdn.com/zohodeskstatic/app/images/portalLogo.de847024ebc0131731a3.png" alt="Zoho Desk"/>
    </a>
  </div>

</div>

</body>
</html>`;


