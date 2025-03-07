/**
 * 网站全局JavaScript功能
 * 包含所有交互效果和动画的实现
 * 使用事件委托和防抖优化性能
 */

/**
 * 平滑滚动效果
 * 功能：为所有锚点链接添加平滑滚动效果
 * 触发：点击任何以#开头的链接时
 * 参数说明：
 * - headerOffset: 80px，考虑固定导航栏高度的偏移量
 * - behavior: smooth，使用平滑滚动动画
 * 效果：
 * 1. 点击导航链接，页面平滑滚动到目标位置
 * 2. 自动调整滚动位置，避免被固定导航栏遮挡
 * 3. 更新URL但不触发页面跳转，便于分享链接
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80; // 考虑固定导航栏的高度
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // 更新 URL，但不触发滚动
            history.pushState(null, '', targetId);
        }
    });
});

/**
 * 滚动进度指示器
 * 创建一个进度条显示页面滚动位置
 * 随着页面滚动，进度条会实时更新宽度
 */
const progressIndicator = document.createElement('div');
progressIndicator.className = 'scroll-progress';
document.body.appendChild(progressIndicator);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressIndicator.style.width = `${scrolled}%`;
});

/**
 * 表单提交处理
 * 拦截表单提交事件，显示提交成功提示
 * 提交后重置表单内容
 */
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('感谢您的留言！我们会尽快回复。');
    form.reset();
});

/**
 * 按钮点击效果
 * 点击CTA按钮时平滑滚动到关于部分
 */
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', function() {
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
    });
});

/**
 * 导航栏滚动效果
 * 页面向下滚动时，导航栏背景变得更不透明
 * 同时添加阴影效果增强视觉层次
 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        header.style.backgroundColor = '#fff';
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
    }
});

/**
 * 文章卡片交互动画
 * 鼠标悬停时卡片微微上浮
 * 营造轻量感和交互反馈
 */
const articleCards = document.querySelectorAll('.article-card');
articleCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

/**
 * 个人头像加载动画
 * 页面加载完成后淡入显示头像
 * 提升用户体验和视觉效果
 */
document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.style.opacity = '0';
        setTimeout(() => {
            profileImage.style.transition = 'opacity 0.5s ease';
            profileImage.style.opacity = '1';
        }, 100);
    }
});

/**
 * 文章数据管理
 * 功能：管理和存储所有博客文章数据
 * 数据结构：
 * - id: 唯一标识符，使用时间戳生成
 * - title: 文章标题
 * - content: 文章完整内容
 * - excerpt: 文章摘要，用于列表页展示
 * - date: 发布日期，格式YYYY-MM-DD
 * - author: 作者姓名
 * - tags: 文章标签数组
 * - coverImage: 封面图片路径
 * - link: 文章详情页链接
 * 
 * 存储方式：
 * - 使用localStorage存储文章数据
 * - 键名：'articles'
 * - 值：JSON字符串格式的文章数组
 * 
 * 调用时机：
 * - 页面加载时自动初始化文章数据
 * - 添加/编辑/删除文章时更新数据
 */
function loadArticles() {
    const articles = [
        {
            id: Date.now() + 1,
            title: "越买不起的房子的时候，越要贷款买最贵的房子",
            content: "标题似乎有些标题党，原话应该是几年前博鳌论坛楼市分论坛中，金融研究所院长，首席经济学家管清友先生的一句话：'现在买不起房的时候，你就抓紧多买两套。'被广大网友调侃之余，相信管先生更多想表达的是：争夺稀缺资源才会是人生选择的最优解，而收入越低的朋友，越要在人生中小心选择...",
            excerpt: "探讨为什么在经济压力下，投资优质资产反而更重要。深入分析房地产投资的杠杆效应、区位优势和资产保值等关键因素。",
            date: "2024-03-21",
            author: "刘春起",
            tags: ["经济", "房地产", "投资"],
            coverImage: "../images/house.jpeg",
            link: "house.html"
        },
        {
            id: Date.now() + 2,
            title: "RWA 第一公链 MANTRA($OM) 什么来头？年初至今默默上涨近百倍",
            content: "在加密货币市场中，MANTRA($OM)以其独特的定位和惊人的涨幅引起了广泛关注。作为RWA（Real World Assets）赛道的第一公链，MANTRA正在重新定义区块链与现实资产的结合方式...",
            excerpt: "深入分析MANTRA项目的技术创新和投资价值，探讨RWA赛道的发展前景和市场机遇。",
            date: "2024-03-21",
            author: "刘春起",
            tags: ["区块链", "加密货币", "投资"],
            coverImage: "../images/mantra.jpeg",
            link: "mantra.html"
        },
        {
            id: Date.now() + 3,
            title: "关于 23 年来：对投资、缠中说缠以及快乐人生的一些感悟",
            content: "2023年是一个特殊的年份，市场的起起落落给了我们很多思考的机会。在这一年里，我对投资、《缠中说禅》以及人生有了一些新的认识和感悟...",
            excerpt: "分享2023年在投资和人生方面的深刻感悟，探讨市场、理论与人生的平衡之道。",
            date: "2024-03-21",
            author: "刘春起",
            tags: ["投资", "人生", "感悟"],
            coverImage: "../images/investment.jpeg",
            link: "investment.html"
        },
        {
            id: Date.now() + 4,
            title: "Ethan 的区块链观察 Ⅱ：矿工与房东",
            content: "近段时间对于我个人而言，信息量过于密集：香港物价 + Web3 之旅，甘肃天水麻辣烫网红城市爆火，矿工驱动的 Solana & Base 上金狗频出，比特币价格暴跌引发反向 Meme 热潮...",
            excerpt: "探讨区块链矿工与现实世界房东的经济角色相似性，以及数字资产与实体经济的深层联系。",
            date: "2024-03-21",
            author: "刘春起",
            tags: ["区块链", "观察", "经济"],
            coverImage: "../images/blockchain.jpeg",
            link: "blockchain.html"
        },
        {
            id: Date.now() + 5,
            title: "理解 meme，理解加密货币",
            content: "在加密货币中从业的这段时间，似乎每天都在和 Meme 打交道，从 BRC-20 的 ORDI、SATS，再到马斯克背书的狗狗币（Doge）、Troll（巨魔）。但要说清什么是 Meme，它为什么有价格，是什么支撑它们上亿甚至几十亿的市值...好吧，这真的很难。",
            excerpt: "深入探讨Meme在加密货币领域的文化现象和经济价值，从BRC-20到狗狗币的演变历程。",
            date: "2024-03-21",
            author: "刘春起",
            tags: ["区块链", "加密货币", "Meme"],
            coverImage: "../images/meme.jpeg",
            link: "meme.html"
        },
        {
            id: Date.now() + 6,
            title: "经济学学得越好，反而越赚不到钱？",
            content: "最近又受到了极大的刺激：有一位专门做投资的朋友，在如此落寞的经济大环境下，默默地实现了财富自由，并在上海购置了一套奢华的别墅。而我，依旧抱怨着时代的生不逢时，落寞度日...",
            excerpt: "探讨理论与实践的差异，分析为什么经济学理论知识并不总能带来实际的投资收益。",
            date: "2024-03-22",
            author: "刘春起",
            tags: ["经济学", "投资", "套利"],
            coverImage: "../images/economics.jpeg",
            link: "economics.html"
        },
        {
            id: Date.now() + 7,
            title: "一周感悟：关于交易、Hyperliquid、Usual 、无风险利率、泰国、缠论，财务投资人...",
            content: "这一周发生的事情实在太多，与其说发生的不如说"思考"的方面又多又杂，新奇的事物一个接一个的出来。首先从熟悉的"交易"话题开始：我接触交易很早，大约在上高中的时候了解到了股票以及数字货币...",
            excerpt: "分享一周以来关于交易、投资、市场的深度思考和感悟。",
            date: "2024-03-23",
            author: "刘春起",
            tags: ["交易", "投资", "感悟"],
            coverImage: "../images/trading.jpeg",
            link: "trading.html"
        },
        {
            id: Date.now() + 8,
            title: "你得学会观察河流，而不是站在河中央",
            content: "2010 年，互联网迎来爆发式增长，我站在河流中见证了太多的时代弄潮儿：从加密市场的中本聪、股市的徐翔、桑田路、北京吵架，期货市场的付海棠再到当红明星赵露思。我们乐于谈论属于他们的八卦，谈论他们的故事，可是热血之后还是平淡，我一直在思考：对于普通人而言，如何在时代的大潮中赚取属于自己的红利，而不是追逐河流寻求一场空欢喜？...",
            excerpt: "探讨如何在市场中保持观察者视角，从宏观趋势中把握机会，以及如何避免被市场信息流所淹没。",
            date: "2024-03-24",
            author: "刘春起",
            tags: ["投资", "思考", "市场观察"],
            coverImage: "../images/river.jpeg",
            link: "river.html"
        }
    ];

    localStorage.setItem('articles', JSON.stringify(articles));
    return articles;
}

/**
 * 渲染精选文章
 * 从文章列表中获取最新的三篇文章
 * 在首页展示区域渲染文章预览卡片
 * 包含文章封面图、标题、摘要、日期和标签等信息
 */
function renderFeaturedArticles() {
    const articles = loadArticles();
    const featuredArticles = articles.slice(0, 3); // 只获取最新的三篇文章
    const featuredArticlesContainer = document.getElementById('featuredArticles');
    
    if (featuredArticles.length === 0) {
        featuredArticlesContainer.innerHTML = '<p class="no-articles">暂无文章</p>';
        return;
    }

    // 添加文章
    const articlesHTML = featuredArticles.map(article => {
        return `
            <article class="featured-article">
                <img src="${article.coverImage}" alt="${article.title}" class="featured-article-image">
                <div class="featured-article-content">
                    <h3 class="featured-article-title">${article.title}</h3>
                    <p class="featured-article-subtitle">${article.excerpt}</p>
                    <div class="featured-article-meta">
                        <div class="meta-info">
                            <span class="featured-article-date">${article.date}</span>
                            <span class="meta-separator">·</span>
                            <span class="featured-article-author">${article.author}</span>
                        </div>
                        <a href="${article.link}" class="featured-article-link">阅读全文</a>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    // 添加文章到容器
    featuredArticlesContainer.innerHTML = articlesHTML;
}

// 显示完整文章
function showArticle(articleData) {
    const article = JSON.parse(decodeURIComponent(articleData));
    const main = document.querySelector('main');
    const originalContent = main.innerHTML;
    
    main.innerHTML = `
        <section class="article-full">
            <div class="article-container">
                <div class="article-header">
                    <button onclick="closeArticle()" class="back-button">返回列表</button>
                    <button onclick="editArticle(${article.id})" class="edit-button">编辑文章</button>
                    <button onclick="deleteArticle(${article.id})" class="delete-button">删除文章</button>
                </div>
                <h1>${article.title}</h1>
                <div class="article-meta">
                    <span class="article-date">${new Date(article.date).toLocaleDateString()}</span>
                    <span class="article-author">${article.author}</span>
                </div>
                <div class="article-tags">
                    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="article-content">
                    ${article.content}
                </div>
            </div>
        </section>
    `;
    
    main.setAttribute('data-original', originalContent);
}

// 编辑文章
function editArticle(articleId) {
    // 获取文章数据
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    const article = articles.find(a => a.id === articleId);
    
    if (!article) {
        alert('文章不存在');
        return;
    }
    
    // 将文章数据存储到 localStorage，以便编辑页面使用
    localStorage.setItem('editingArticle', JSON.stringify(article));
    
    // 跳转到编辑页面
    window.location.href = `editor.html?mode=edit&id=${articleId}`;
}

// 删除文章
function deleteArticle(articleId) {
    if (confirm('确定要删除这篇文章吗？此操作不可恢复。')) {
        let articles = JSON.parse(localStorage.getItem('articles') || '[]');
        articles = articles.filter(article => article.id !== articleId);
        localStorage.setItem('articles', JSON.stringify(articles));
        window.location.href = 'articles.html';
    }
}

// 返回文章列表
function closeArticle() {
    const main = document.querySelector('main');
    main.innerHTML = main.getAttribute('data-original');
    renderFeaturedArticles();
}

// 添加导航按钮
function addNavButtons() {
    const navContainer = document.querySelector('.nav-container');
    const writeButton = document.createElement('a');
    writeButton.href = 'editor.html';
    writeButton.className = 'write-button';
    writeButton.textContent = '写文章';
    navContainer.appendChild(writeButton);
}

// 加载最新文章展示位
async function loadLatestShowcaseArticle() {
    try {
        // 从文章列表页面获取最新文章
        const response = await fetch('articles.html');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // 获取第一篇文章的信息
        const firstArticle = doc.querySelector('.article-item');
        if (firstArticle) {
            const showcaseArticle = document.getElementById('showcaseArticle');
            
            // 获取文章链接和ID
            const articleId = firstArticle.getAttribute('data-id');
            const articleLink = `article.html?id=${articleId}`;
            showcaseArticle.href = articleLink;
            
            // 设置图片
            const showcaseImage = document.getElementById('showcaseImage');
            const articleImage = firstArticle.querySelector('img').src;
            showcaseImage.src = articleImage || '../images/default.jpeg';
            showcaseImage.alt = firstArticle.querySelector('.article-title').textContent;
            
            // 设置标题
            const title = firstArticle.querySelector('.article-title').textContent;
            document.getElementById('showcaseTitle').textContent = title;
            
            // 设置摘要
            const excerpt = firstArticle.querySelector('.article-excerpt').textContent;
            document.getElementById('showcaseExcerpt').textContent = excerpt;
            
            // 设置日期
            const date = firstArticle.querySelector('.article-date').textContent;
            document.getElementById('showcaseDate').textContent = date;
        } else {
            // 如果没有找到文章，使用默认内容
            const showcaseArticle = document.getElementById('showcaseArticle');
            showcaseArticle.href = 'articles.html';
            
            document.getElementById('showcaseImage').src = '../images/default.jpeg';
            document.getElementById('showcaseTitle').textContent = '开始你的写作之旅';
            document.getElementById('showcaseExcerpt').textContent = 
                '在这里，你可以分享你的想法、经验和见解。点击开始创作你的第一篇文章。';
            document.getElementById('showcaseDate').textContent = '随时开始';
        }
    } catch (error) {
        console.error('加载最新文章失败:', error);
        // 出错时显示默认内容
        const showcaseArticle = document.getElementById('showcaseArticle');
        showcaseArticle.href = 'articles.html';
        
        document.getElementById('showcaseImage').src = '../images/default.jpeg';
        document.getElementById('showcaseTitle').textContent = '探索更多精彩内容';
        document.getElementById('showcaseExcerpt').textContent = 
            '在文章列表中，你可以找到更多关于技术、思考和见解的分享。点击查看完整的文章列表。';
        document.getElementById('showcaseDate').textContent = '持续更新中';
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedArticles();
    addNavButtons();
    loadLatestShowcaseArticle();
}); 

// 滚动监听和动画触发
let lastScrollY = window.scrollY;
let ticking = false;

// 优化滚动动画效果
function handleScroll() {
    const currentScrollY = window.scrollY;
    const header = document.querySelector('header');
    
    // 导航栏滚动动画
    if (currentScrollY > lastScrollY) {
        header.classList.add('scroll-down');
        header.classList.remove('scroll-up');
    } else {
        header.classList.add('scroll-up');
        header.classList.remove('scroll-down');
    }
    
    lastScrollY = currentScrollY;
    
    // 元素出现动画
    const elements = document.querySelectorAll('.profile-container, .article-card, .about-content, .contact-content');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
            element.classList.add('fade-in');
            element.classList.remove('hidden');
        } else {
            element.classList.remove('fade-in');
            element.classList.add('hidden');
        }
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
        });
        ticking = true;
    }
});

// 页面加载时初始化动画
document.addEventListener('DOMContentLoaded', () => {
    // 添加初始隐藏类
    const elements = document.querySelectorAll('.profile-container, .article-card, .about-content, .contact-content');
    elements.forEach(element => {
        element.classList.add('hidden');
    });
    
    // 触发初始动画
    setTimeout(() => {
        handleScroll();
    }, 100);
    
});