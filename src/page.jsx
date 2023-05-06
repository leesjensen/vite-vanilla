import React from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "./page.css";
import "./github-markdown.css";

export default function Page({ onNav }) {
  const location = useLocation();
  const wildcard = useParams()["*"];
  const url =
    "https://github.com/webprogramming260/.github/blob/main/profile/" +
    wildcard;
  const gitHubUrl = url.replace("_", ".");
  const [h, setH] = React.useState("Loading...");

  React.useEffect(() => {
    let rawUrl = gitHubUrl.replace(
      "github.com/webprogramming260/.github/blob",
      "raw.githubusercontent.com/webprogramming260/.github"
    );
    const [, rootUrl] = /(.*\/)([^\/]*)$/.exec(rawUrl);

    fetch(rawUrl)
      .then((r) => r.text())
      .then((body) => {
        const reg = /\!\[(.*)\]\((.*)\)/g;
        const up = body.replaceAll(reg, `![$1](${rootUrl}$2)`);

        let ht = md.render(up);
        ht = ht.replaceAll("☑", '<span class="assignment">☑</span>');
        ht = ht.replaceAll(
          "Canvas",
          '<a href="https://byu.instructure.com/courses/21349/assignments">Canvas</a>'
        );

        setH(ht);
      });
  }, [location]);

  return (
    <>
      <PageNav onNav={onNav} url={url} gitHubUrl={gitHubUrl}></PageNav>
      <div
        id="md"
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: h }}
      ></div>
      <PageNav onNav={onNav} url={url} gitHubUrl={gitHubUrl}></PageNav>
    </>
  );
}

function PageNav({ onNav, url, gitHubUrl }) {
  return (
    <div className="topic-nav">
      <NavLink to={onNav("prev", url)}>Prev</NavLink>
      <NavLink to="/">Topics</NavLink>
      <a href={gitHubUrl}>GitHub</a>
      <NavLink to={onNav("next", url)}>Next</NavLink>
    </div>
  );
}

const md = MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          "<pre>" +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          `</pre>`
        );
      } catch (__) {}
    }

    return "";
  },
});
