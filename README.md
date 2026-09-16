<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Family Star</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, Tahoma, sans-serif;
    }

    body {
      min-height: 100vh;
      background: #05091b;
      color: #ffffff;
    }

    .page {
      min-height: 100vh;
    }

    /* ==============================
       تسجيل الدخول
    ============================== */

    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background:
        radial-gradient(
          circle at top,
          #1b2b68 0%,
          #0b1235 45%,
          #05091b 100%
        );
    }

    .login-box {
      width: 100%;
      max-width: 420px;
      padding: 30px 22px;
      text-align: center;
      background: #0d1433;
      border-radius: 24px;
      border: 1px solid rgba(255,255,255,.08);
      box-shadow: 0 15px 40px rgba(0,0,0,.45);
    }

    .logo {
      font-size: 58px;
      margin-bottom: 10px;
    }

    .login-box h1 {
      font-size: 30px;
      margin-bottom: 8px;
    }

    .welcome {
      color: #aeb8df;
      margin-bottom: 25px;
    }

    .phone-input {
      width: 100%;
      height: 52px;
      padding: 0 16px;
      border: none;
      outline: none;
      border-radius: 14px;
      background: #182047;
      color: #ffffff;
      font-size: 16px;
      margin-bottom: 14px;
      text-align: right;
    }

    .phone-input::placeholder {
      color: #8993bd;
    }

    .main-btn {
      width: 100%;
      height: 52px;
      border: none;
      border-radius: 14px;
      background: #6c5ce7;
      color: #ffffff;
      font-size: 17px;
      font-weight: bold;
      cursor: pointer;
    }

    .main-btn:active {
      transform: scale(.98);
    }

    .login-note {
      margin-top: 20px;
      color: #8e98bf;
      font-size: 13px;
    }
  </style>
</head>

<body>

  <!-- ==============================
       Family Star
       تسجيل الدخول
  ============================== -->

  <main id="loginPage" class="page login-page">

    <div class="login-box">

      <div class="logo">⭐</div>

      <h1>Family Star</h1>

      <p class="welcome">
        أهلاً بك في Family Star
      </p>

      <input
        id="phoneInput"
        class="phone-input"
        type="tel"
        inputmode="tel"
        placeholder="اكتب رقم الهاتف"
      >

      <button
        id="loginButton"
        class="main-btn"
        type="button"
      >
        تسجيل الدخول
      </button>

      <p class="login-note">
        برنامج ترفيه وتسلية
      </p>

    </div>

  </main>


  <script>

    /* ==============================
       تسجيل الدخول
    ============================== */

    const phoneInput =
      document.getElementById("phoneInput");

    const loginButton =
      document.getElementById("loginButton");


    loginButton.addEventListener("click", function () {

      const phone =
        phoneInput.value.trim();


      if (!phone) {

        alert("اكتب رقم الهاتف أولاً");

        return;
      }


      /*
        حفظ الرقم محليًا مؤقتًا.
        لاحقًا سنربطه بنظام حسابات حقيقي.
      */

      localStorage.setItem(
        "familyStarPhone",
        phone
      );


      alert("تم تسجيل الدخول بنجاح");

    });

  </script>

</body>
</html>
