// 格式化文本
function formatText(command) {
    document.execCommand(command, false, null);
}

// 插入链接
function insertLink() {
    const url = prompt('请输入链接地址：');
    if (url) {
        document.execCommand('createLink', false, url);
    }
}

// 处理图片上传
function handleImageUpload(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // 将图片插入编辑器
            const img = document.createElement('img');
            img.src = e.target.result;
            document.getElementById('editor').appendChild(img);
            
            // 清空文件输入框，允许重复选择同一文件
            input.value = '';
            
            // 滚动到新插入的图片位置
            img.scrollIntoView({ behavior: 'smooth', block: 'end' });
        };
        
        reader.readAsDataURL(file);
    }
}

// 发布文章
document.getElementById('publishButton').addEventListener('click', function() {
    const title = document.getElementById('articleTitle').value;
    const tags = document.getElementById('articleTags').value;
    const content = document.getElementById('editor').innerHTML;
    
    if (!title || !content) {
        alert('请填写文章标题和内容');
        return;
    }
    
    const article = {
        title,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        content,
        date: new Date().toISOString(),
        author: '刘春起 Ethan'
    };
    
    // 获取现有文章
    let articles = JSON.parse(localStorage.getItem('articles') || '[]');
    
    // 添加新文章
    articles.unshift(article);
    
    // 保存文章
    localStorage.setItem('articles', JSON.stringify(articles));
    
    // 跳转到首页
    window.location.href = 'index.html';
});

document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('coverImage');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const uploadPlaceholder = document.querySelector('.upload-placeholder');
    const form = document.getElementById('articleForm');

    // 处理图片选择
    imageInput.addEventListener('change', handleImageSelect);

    // 处理拖拽上传
    imagePreview.addEventListener('dragover', function(e) {
        e.preventDefault();
        imagePreview.classList.add('drag-over');
    });

    imagePreview.addEventListener('dragleave', function(e) {
        e.preventDefault();
        imagePreview.classList.remove('drag-over');
    });

    imagePreview.addEventListener('drop', function(e) {
        e.preventDefault();
        imagePreview.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            imageInput.files = files;
            handleImageSelect({ target: imageInput });
        }
    });

    // 处理表单提交
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', document.getElementById('title').value);
        formData.append('excerpt', document.getElementById('excerpt').value);
        formData.append('content', document.getElementById('content').value);
        formData.append('tags', document.getElementById('tags').value);
        
        if (imageInput.files.length > 0) {
            formData.append('coverImage', imageInput.files[0]);
        }

        try {
            // 保存文章到本地存储
            const imageUrl = await handleImageUpload(imageInput.files[0]);
            const article = {
                id: Date.now(),
                title: formData.get('title'),
                excerpt: formData.get('excerpt'),
                content: formData.get('content'),
                tags: formData.get('tags').split(',').map(tag => tag.trim()),
                coverImage: imageUrl,
                date: new Date().toISOString().split('T')[0],
                author: '刘春起'
            };

            // 获取现有文章
            const articles = JSON.parse(localStorage.getItem('articles') || '[]');
            articles.unshift(article);
            localStorage.setItem('articles', JSON.stringify(articles));

            // 跳转到文章列表页
            window.location.href = 'articles.html';
        } catch (error) {
            console.error('保存文章失败:', error);
            alert('保存文章失败，请重试');
        }
    });

    // 如果是编辑模式，加载现有文章数据
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'edit') {
        const articleId = parseInt(urlParams.get('id'));
        loadArticleForEditing(articleId);
    }
});

// 处理图片选择
function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB
            alert('图片大小不能超过5MB');
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('请选择图片文件');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const previewImg = document.getElementById('previewImg');
            const uploadPlaceholder = document.querySelector('.upload-placeholder');
            
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
            uploadPlaceholder.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

// 处理图片上传
async function handleImageUpload(file) {
    if (!file) return '';

    // 这里我们将图片转换为Base64字符串并存储
    // 在实际项目中，你可能需要将图片上传到服务器
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// 加载文章进行编辑
function loadArticleForEditing(articleId) {
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    const article = articles.find(a => a.id === articleId);
    
    if (article) {
        document.getElementById('title').value = article.title;
        document.getElementById('excerpt').value = article.excerpt;
        document.getElementById('content').value = article.content;
        document.getElementById('tags').value = article.tags.join(', ');
        
        if (article.coverImage) {
            const previewImg = document.getElementById('previewImg');
            const uploadPlaceholder = document.querySelector('.upload-placeholder');
            
            previewImg.src = article.coverImage;
            previewImg.style.display = 'block';
            uploadPlaceholder.style.display = 'none';
        }
    }
} 