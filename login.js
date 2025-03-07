function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 验证账号密码
    if (username === '1872383613' && password === 'lcq12345') {
        // 登录成功，设置登录状态
        localStorage.setItem('isLoggedIn', 'true');
        // 跳转到文章编辑页面
        window.location.href = 'editor.html';
    } else {
        alert('账号或密码错误');
    }
} 