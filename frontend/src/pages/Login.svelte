    <script>
    import { Link } from 'svelte-routing';
    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();
    
    let username = '';
    let password = '';
    
    async function handleLogin() {
        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (res.ok) {
            // TODO ---------------- handle successful login
            console.log('Login successful!');
            addNotification({
              text: 'Logged in successfully!',
              position: 'top-center',
              type: 'success',
              removeAfter: 2500,

            })
        } else {
            // // TODO ---------------- handle error
            console.log('Login failed!');
            addNotification({
              text: 'Login not correct.',
              position: 'top-center',
              type: 'error',
              removeAfter: 2500,

            })
        }
    }
    </script>
    
    <style>
    input {
        padding: 10px;
        border: none;
        border-radius: 5px;
        outline: none;
        box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.1);
    }
    button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #008CBA;
        color: white;
        cursor: pointer;
    }
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70vh;
        flex-direction: column;
        gap: 20px;
    }
    .center-inner {
        background: #f3f3f3;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    </style>
    

    <div class="center">
        <div class="center-inner">
        <h2>Login</h2>
        <p>Welcome back!</p>
        <input bind:value={username} placeholder="Username" />
            <input bind:value={password} type="password" placeholder="Password" />
            <button on:click={handleLogin}>Log In</button>
            <Link to="/signup">Signup</Link>
        </div>
    </div>