const API_URL = 'http://localhost:3000/api';

// Tab switching
function showTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
    
    if (tab === 'users') loadUsers();
    if (tab === 'roles') loadRoles();
}

// Load Users
async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();
        const tbody = document.getElementById('users-body');
        
        tbody.innerHTML = users.map(user => `
            <tr>
                <td><img src="${user.avatarUrl}" class="avatar" alt="avatar"></td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.fullName || '-'}</td>
                <td>${user.role?.name || '-'}</td>
                <td>
                    <span class="status-badge ${user.status ? 'status-active' : 'status-inactive'}">
                        ${user.status ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td>${user.loginCount}</td>
                <td>
                    ${!user.status ? `<button class="action-btn btn-enable" onclick="enableUser('${user.email}', '${user.username}')">Enable</button>` : ''}
                    ${user.status ? `<button class="action-btn btn-disable" onclick="disableUser('${user.email}', '${user.username}')">Disable</button>` : ''}
                    <button class="action-btn btn-delete" onclick="deleteUser('${user._id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Load Roles
async function loadRoles() {
    try {
        const response = await fetch(`${API_URL}/roles`);
        const roles = await response.json();
        const tbody = document.getElementById('roles-body');
        
        tbody.innerHTML = roles.map(role => `
            <tr>
                <td>${role.name}</td>
                <td>${role.description || '-'}</td>
                <td>${new Date(role.createdAt).toLocaleDateString('vi-VN')}</td>
            </tr>
        `).join('');
        
        // Update role select
        const select = document.getElementById('roleSelect');
        select.innerHTML = '<option value="">-- Chọn Role --</option>' + 
            roles.map(role => `<option value="${role._id}">${role.name}</option>`).join('');
    } catch (error) {
        console.error('Error loading roles:', error);
    }
}

// Show/Hide Forms
function showCreateUserForm() {
    document.getElementById('user-form').style.display = 'block';
    loadRoles();
}

function hideUserForm() {
    document.getElementById('user-form').style.display = 'none';
}

function showCreateRoleForm() {
    document.getElementById('role-form').style.display = 'block';
}

function hideRoleForm() {
    document.getElementById('role-form').style.display = 'none';
}

// Create User
async function createUser() {
    const userData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value,
        fullName: document.getElementById('fullName').value,
        role: document.getElementById('roleSelect').value || undefined
    };
    
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        
        if (response.ok) {
            alert('User created successfully!');
            hideUserForm();
            loadUsers();
            document.getElementById('user-form').querySelectorAll('input').forEach(i => i.value = '');
        } else {
            const error = await response.json();
            alert('Error: ' + error.error);
        }
    } catch (error) {
        alert('Error creating user: ' + error.message);
    }
}

// Create Role
async function createRole() {
    const roleData = {
        name: document.getElementById('roleName').value,
        description: document.getElementById('roleDescription').value
    };
    
    try {
        const response = await fetch(`${API_URL}/roles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(roleData)
        });
        
        if (response.ok) {
            alert('Role created successfully!');
            hideRoleForm();
            loadRoles();
            document.getElementById('role-form').querySelectorAll('input').forEach(i => i.value = '');
        } else {
            const error = await response.json();
            alert('Error: ' + error.error);
        }
    } catch (error) {
        alert('Error creating role: ' + error.message);
    }
}

// Enable User
async function enableUser(email, username) {
    try {
        const response = await fetch(`${API_URL}/users/enable`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username })
        });
        
        if (response.ok) {
            alert('User enabled!');
            loadUsers();
        } else {
            alert('Error enabling user');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Disable User
async function disableUser(email, username) {
    try {
        const response = await fetch(`${API_URL}/users/disable`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username })
        });
        
        if (response.ok) {
            alert('User disabled!');
            loadUsers();
        } else {
            alert('Error disabling user');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Delete User (soft delete)
async function deleteUser(id) {
    if (!confirm('Bạn có chắc muốn xóa user này?')) return;
    
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('User deleted!');
            loadUsers();
        } else {
            alert('Error deleting user');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Load users on page load
loadUsers();
