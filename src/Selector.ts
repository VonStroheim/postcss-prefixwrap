import { PostCSSAtRule, PostCSSRule } from "Types";

const ANY_WHITESPACE_AT_BEGINNING_OR_END = /(^\s*|\s*$)/g;
const IS_ROOT_TAG = /^(body|html|:root).*$/;

export default class Selector {
  static isValid(cssSelector: string | null): boolean {
    return cssSelector !== null;
  }

  static clean(cssSelector: string): string {
    return cssSelector.replace(ANY_WHITESPACE_AT_BEGINNING_OR_END, "");
  }

  static isKeyframes(cssRule: PostCSSRule): boolean {
    const { parent } = cssRule;
    const parentReal = parent as PostCSSAtRule;

    // @see https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
    return (
      parent !== undefined &&
      parentReal.type === "atrule" &&
      parentReal.name !== undefined &&
      parentReal.name.match(/keyframes$/) !== null
    );
  }

  static isNotRootTag(cleanSelector: string): boolean {
    return !cleanSelector.match(IS_ROOT_TAG);
  }
}
