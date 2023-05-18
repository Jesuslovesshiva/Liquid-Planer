<script>
    import { Link } from 'svelte-routing';
    let username = '';
    let password = '';
    
    async function handleSignup() {
        const res = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (res.ok) {
            // handle successful signup
            console.log('Signup successful!');
        } else {
            // handle error
            console.log('Signup failed!');
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
        <h2>Signup</h2>
        <p>Create your account.</p>
        <input bind:value={username} placeholder="Username" />
        <input bind:value={password} type="password" placeholder="Password" />
        <button on:click={handleSignup}>Sign Up</button>
        <Link to="/login">Go to Login</Link>
        </div>
    </div>
    