(function () {
    var API_URL = 'https://api.aoe.top/api/friendly/links';
    var SECTION_ID = 'blog-friendly-links';
    var cachedLinks = null;

    function createSection() {
        var section = document.createElement('section');
        section.id = SECTION_ID;
        section.className = 'blog-friendly-links';
        section.innerHTML = [
            '<div class="blog-friendly-links__header">',
            '<h3 class="blog-friendly-links__title">友情链接</h3>',
            '</div>',
            '<div class="blog-friendly-links__grid">',
            '<div class="blog-friendly-links__state">友链加载中...</div>',
            '</div>'
        ].join('');
        return section;
    }

    function ensureSection() {
        var existing = document.getElementById(SECTION_ID);
        if (existing) {
            return existing;
        }

        var mount = document.querySelector('#footer .footer-list');
        if (!mount) {
            return null;
        }

        var section = createSection();
        mount.appendChild(section);
        return section;
    }

    function renderLinks(section, links) {
        var grid = section.querySelector('.blog-friendly-links__grid');
        if (!grid) {
            return;
        }

        if (!Array.isArray(links) || links.length === 0) {
            grid.innerHTML = '<div class="blog-friendly-links__state">暂无可展示的友链。</div>';
            return;
        }

        grid.innerHTML = links.map(function (link) {
            return '<a class="blog-friendly-links__item" href="' + link.url + '" target="_blank" rel="noopener noreferrer">' + link.name + '</a>';
        }).join('');
    }

    function renderError(section) {
        var grid = section.querySelector('.blog-friendly-links__grid');
        if (grid) {
            grid.innerHTML = '<div class="blog-friendly-links__state">友链加载失败，请稍后重试。</div>';
        }
    }

    function loadLinks(section) {
        if (cachedLinks) {
            renderLinks(section, cachedLinks);
            return;
        }

        fetch(API_URL)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Failed to load links: ' + response.status);
                }
                return response.json();
            })
            .then(function (data) {
                cachedLinks = Array.isArray(data) ? data : [];
                renderLinks(section, cachedLinks);
            })
            .catch(function (error) {
                console.error(error);
                renderError(section);
            });
    }

    function mountFriendlyLinks() {
        var section = ensureSection();
        if (!section) {
            return;
        }

        loadLinks(section);
    }

    document.addEventListener('DOMContentLoaded', mountFriendlyLinks);
    document.addEventListener('pjax:complete', mountFriendlyLinks);
    window.addEventListener('load', mountFriendlyLinks);
})();