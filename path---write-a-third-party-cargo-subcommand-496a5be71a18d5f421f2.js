webpackJsonp([0x9d849597134],{311:function(r,a){r.exports={data:{markdownRemark:{html:'<h1>写一个第三方 cargo 子命令</h1>\n<h2>动机</h2>\n<p>写项目的时候，有时候会写一些较长的 shell 命令，反复输入不方便，也容易丢失，就想着把它放到配置文件里。</p>\n<h2>动手</h2>\n<h3>调研</h3>\n<p>阅读了 cargo 官方 <a href="https://github.com/rust-lang/cargo/wiki/Third-party-cargo-subcommands">wiki</a></p>\n<p>观察目录 ~/.cargo/bin/ 下面的文件，发现一些比如 racer、rls、rustfmt 等命令，是可以直接运行的，还有一些 cargo- 开头的命令，比如 cargo-clippy、cargo-fmt，就是运行 cargo clippy、cargo fmt 等命令时执行的程序。</p>\n<p>试一下，</p>\n<pre><code>cd ~/.cargo/bin/\nln -s racer cargo-racer\ncargo racer\n</code></pre>\n<p>输出比较不是很正常，看上去是把字符串“racer”当做参数传给了命令 racer，不过也对刚才的调查做了简单证实。</p>\n<pre><code>error: Found argument \'racer\' which wasn\'t expected, or isn\'t valid in this context\n\nUSAGE:\n...\n</code></pre>\n<h3>代码</h3>\n<ol>\n<li>创建项目 cargo new cargo-x</li>\n<li>写代码</li>\n<li>发布项目 cargo publish</li>\n</ol>\n<h3>仓库</h3>\n<p>写了一个非常简单的版本，代码在 <a href="https://github.com/liuchong/cargo-x"><img src="https://raw.githubusercontent.com/liuchong/blog/gh-pages/favicon.ico" alt="@liuchong/cargo-x"></a></p>',frontmatter:{date:"December 18, 2018",path:"/write-a-third-party-cargo-subcommand/",title:"build a web blog part 1"}},site:{siteMetadata:{siteName:"黑貓博客"}}},pathContext:{}}}});
//# sourceMappingURL=path---write-a-third-party-cargo-subcommand-496a5be71a18d5f421f2.js.map