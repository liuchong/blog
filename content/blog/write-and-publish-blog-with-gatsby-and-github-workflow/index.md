---
title: 用 gatsby 和 github workflow 写博客
date: "2020-12-17"
description: "用 gatsby 和 github workflow 写博客，支持在在线编辑，自动发布。"
---

刚重新把在 github 上的 private 掉的博客放了出来。

之前用的就是 gatsby，用了自己改出来的一个年久失修 [gatsby-starter-blog-typescript](https://github.com/liuchong/gatsby-starter-blog-typescript)，现在不想升级那个 typescript 版本的代码了，直接清空重新走了一遍流程，更新到最新版官方博客模板 [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog)。

### 安装 gatsby

详细过程可以参考官方文档 <https://www.gatsbyjs.com/tutorial/>，我这里有完整的环境，只需要运行命令：

```
gatsby new my-blog https://github.com/gatsbyjs/gatsby-starter-blog
```

运行完了，把一些文件里面按照需要改一下就可以使用了：

```
content/assets/
src/components/bio.js
gatsby-config.js
```

我还在 `static` 目录放置了一些文件，比如 `CNAME` 用来绑定域名等，它们会被原封不动的复制到网站目录。

安装完后，可以创建一个 github 仓库，我这里就是 `my-blog`，把代码提交，然后安装一个工具 `gh-pages` 尝试发布一下，进行观赏：

```
npm install -g gh-pages
gh-pages -b public -d public -r https://github.com/liuchong/my-blog.git
```

上面命令用 gh-pages 工具把 public 目录发到了 public 分支，只需在项目设置里面设置 github pages 分支，点击显示出来的那个链接博客就出来了。

到目前为止，还不错！

### 写文章

我们看到，在 `content/blog/` 有一些目录，里面分别有一个 index.md，这就是文章了。比如我们参观一下这个 `hello-world`：

```
---
title: Hello World
date: "2015-05-01T22:12:03.284Z"
description: "Hello World"
---

This is my first post on my new fake blog! How exciting!
... 此处省略很多字
```

看完之后，这些展示文章的任务就圆满完成了，我们愿意的话可以把它们删除。然后比着它们的格式，打开咱喜欢的编辑器，写起来吧！

### 设置 workflow

你看，写完有一步发布过程，挺麻烦的。而且什么时候没有环境或者甚至只有一个浏览器，那就发布不了了。索性有 github actions，用上它就方便多了。

我直接把 workflow 配置文件 `.github/workflows/publish.yml` 贴到这里，假设源码提交到了 `master` 分支：

```
name: Publish

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Publish
        run: |
          npm install
          npm install gatsby-cli
          npm run build
          npm install gh-pages
          git config user.email "liuchong@users.noreply.github.com"
          git config user.name "Liu Chong"
          npx gh-pages -b public -d public -r https://${{ secrets.PUBLISH }}@github.com/${{ github.repository }}
```

要注意的是 `secrets.PUBLISH` 这个要手动在 <https://github.com/settings/tokens> 创建 token，
然后再到项目里面添加一个 secrets 项，我这里是在 <https://github.com/liuchong/my-blog/settings/secrets/actions>，`Name`那项就填的 `PUBLISH`。

说明一下，这个链接 <https://docs.github.com/cn/free-pro-team@latest/actions/reference/authentication-in-a-workflow> 上面还有个 `secrets.GITHUB_TOKEN`，
说是自动创建的，不过我没有使用成功。

如果有问题，可以试着手动执行一下命令测试，注意 `***` 改成自己的 secret：

```
gh-pages -b public -d public -r https://***@github.com/liuchong/my-blog.git
```

### 从网页发布

我这篇博客就是在网页上面写的，其中 `date` 条目我手工写的，所以简化了一下，`date: "2020-12-17"` 这样也是可以的。

不过还是不推荐直接在网页上面写，我写完后点击了一下 preview，又点回编辑界面时失败了一下，还以为博客文章没了，吓坏了 👀
