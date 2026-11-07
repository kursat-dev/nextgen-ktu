import{z as k}from"https://app.framerstatic.com/chunk-DWGVAAZZ.mjs";import{a as z}from"https://app.framerstatic.com/chunk-SWYZG2NI.mjs";import{e as S}from"https://app.framerstatic.com/chunk-WLHSDIGQ.mjs";var J="--framer-will-change-override",Q="--framer-will-change-effect-override",U="--framer-will-change-filter-override",X="--overflow-clip-fallback",Y="--one-if-corner-shape-supported";var d=S(z(),1);var x=(r=>(r.Padding="--framer-input-padding",r.BorderRadiusTopLeft="--framer-input-border-radius-top-left",r.BorderRadiusTopRight="--framer-input-border-radius-top-right",r.BorderRadiusBottomRight="--framer-input-border-radius-bottom-right",r.BorderRadiusBottomLeft="--framer-input-border-radius-bottom-left",r.CornerShape="--framer-input-corner-shape",r.BorderColor="--framer-input-border-color",r.BorderTopWidth="--framer-input-border-top-width",r.BorderRightWidth="--framer-input-border-right-width",r.BorderBottomWidth="--framer-input-border-bottom-width",r.BorderLeftWidth="--framer-input-border-left-width",r.BorderStyle="--framer-input-border-style",r.Background="--framer-input-background",r.FontFamily="--framer-input-font-family",r.FontWeight="--framer-input-font-weight",r.FontSize="--framer-input-font-size",r.FontColor="--framer-input-font-color",r.FontStyle="--framer-input-font-style",r.FontLetterSpacing="--framer-input-font-letter-spacing",r.FontTextAlignment="--framer-input-font-text-alignment",r.FontLineHeight="--framer-input-font-line-height",r.FontOpenType="--framer-input-font-open-type-features",r.FontVariationAxes="--framer-input-font-variation-axes",r.PlaceholderColor="--framer-input-placeholder-color",r.BoxShadow="--framer-input-box-shadow",r.FocusedBorderColor="--framer-input-focused-border-color",r.FocusedBorderWidth="--framer-input-focused-border-width",r.FocusedBorderStyle="--framer-input-focused-border-style",r.FocusedBackground="--framer-input-focused-background",r.FocusedBoxShadow="--framer-input-focused-box-shadow",r.FocusedTransition="--framer-input-focused-transition",r.BooleanCheckedBackground="--framer-input-boolean-checked-background",r.BooleanCheckedBorderColor="--framer-input-boolean-checked-border-color",r.BooleanCheckedBorderWidth="--framer-input-boolean-checked-border-width",r.BooleanCheckedBorderStyle="--framer-input-boolean-checked-border-style",r.BooleanCheckedBoxShadow="--framer-input-boolean-checked-box-shadow",r.BooleanCheckedTransition="--framer-input-boolean-checked-transition",r.InvalidTextColor="--framer-input-invalid-text-color",r.IconBackgroundImage="--framer-input-icon-image",r.IconMaskImage="--framer-input-icon-mask-image",r.IconColor="--framer-input-icon-color",r.IconContent="--framer-input-icon-content",r.WrapperHeight="--framer-input-wrapper-height",r))(x||{});var a=x,b="framer-form-input",w="framer-form-input-wrapper",rr="framer-form-input-empty",er="framer-form-input-forced-focus",tr="framer-form-input-forced-checked";function L(e){return typeof e=="number"?e:e.startsWith("--")?i.variable(e):e===""?'""':e}var i=(()=>{function e(t,o){let f=" ";for(let c in o){let m=o[c];k(m!==void 0,"Encountered `undefined` in CSSDeclaration"),f+=`${c.replace(/([A-Z])/gu,"-$1").toLowerCase()}: ${L(m)}; `}return t+" {"+f+"}"}return e.variable=(...t)=>{let o=t[t.length-1];k(o!==void 0,"Zero variables passed to `css.variable`");let f=o.startsWith("--")?`var(${o})`:o;for(let c=t.length-2;c>=0;c--)f=`var(${t[c]}, ${f})`;return f},e})(),ar=[i(`.${b}`,{padding:i.variable(a.Padding),background:"transparent",fontFamily:i.variable(a.FontFamily),fontWeight:i.variable(a.FontWeight),fontSize:i.variable(a.FontSize),fontStyle:i.variable(a.FontStyle),color:i.variable(a.FontColor),fontFeatureSettings:i.variable(a.FontOpenType),fontVariationSettings:i.variable(a.FontVariationAxes),border:"none",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",width:"100%",height:i.variable(a.WrapperHeight,"100%"),letterSpacing:i.variable(a.FontLetterSpacing),textAlign:i.variable(a.FontTextAlignment),lineHeight:i.variable(a.FontLineHeight)}),i(`.${b}:focus-visible`,{outline:"none"})],or=[i(`.${w}`,{overflow:"hidden"})],nr=`var(${a.BorderTopWidth}) var(${a.BorderRightWidth}) var(${a.BorderBottomWidth}) var(${a.BorderLeftWidth})`,ir=[`.${w}:after {
        content: "";
        pointer-events: none;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-top-left-radius: var(${a.BorderRadiusTopLeft});
        border-top-right-radius: var(${a.BorderRadiusTopRight});
        border-bottom-right-radius: var(${a.BorderRadiusBottomRight});
        border-bottom-left-radius: var(${a.BorderRadiusBottomLeft});
        corner-shape: var(${a.CornerShape});
        border-color: var(${a.BorderColor});
        border-top-width: var(${a.BorderTopWidth});
        border-right-width: var(${a.BorderRightWidth});
        border-bottom-width: var(${a.BorderBottomWidth});
        border-left-width: var(${a.BorderLeftWidth});
        border-style: var(${a.BorderStyle});
        transition: var(${a.FocusedTransition});
        transition-property: border-color, border-width, border-style, border-top-left-radius, border-top-right-radius, border-bottom-right-radius, border-bottom-left-radius, corner-shape;
    }`],E="customError",M="valid";function R(e){return e!==E&&e!==M}function y(e){for(let t in e)if(R(t)&&e?.[t]===!0)return!0;return!1}function fr(e,t,o,f,c){let m=d.default.useRef(null),s=d.default.useCallback(l=>{t&&m.current!==!1&&(m.current=!1,l.currentTarget.setCustomValidity(" "),l.currentTarget.reportValidity(),t(l))},[t]),h=d.default.useCallback(l=>{if(o?.(l),!t&&!e)return;let v=l.target.validity;m.current===!1&&!y(v)&&(l.currentTarget.setCustomValidity(""),l.target.reportValidity(),m.current=!0,e?.())},[t,e,o]),g=d.default.useCallback(l=>{if(!t){f?.(l);return}if(m.current===!1)return;let v=l.currentTarget.validity;if(y(v)){s(l);return}f?.(l)},[s,f,t]);return d.default.useMemo(()=>({onInvalid:s,onChange:h,onBlur:g,onFocus:c}),[s,h,g,c])}var lr=10,cr=8,u=16,H={backgroundRepeat:"no-repeat",backgroundSize:`${u}px`,maskRepeat:"no-repeat",maskSize:`${u}px`,backgroundColor:i.variable(a.IconColor)},mr={content:"",display:"block",position:"absolute",right:0,top:0,bottom:0,width:`${u}px`,boxSizing:"content-box",padding:i.variable(a.Padding),border:"none",pointerEvents:"none",...H};var xr="--list-style-type",$="--max-list-digits";function vr(e,t,o){let f=e+Math.max(t,1)-1;switch(o){case"decimal":return q(f);case"lower-alpha":case"upper-alpha":case"lower-latin":case"upper-latin":return W(f);case"lower-roman":case"upper-roman":return A(f);default:return q(f)}}function q(e){return String(e).length}function W(e){let t=1;for(;P(t)<e;)t++;return t}function P(e){let t=0;for(let o=0;o<e;o++)t+=26**(o+1);return t}var D=[1,2,3,8,18,28,38,88,188,288,388,888];function A(e){let t=0;for(let f of D){if(e<f)return t;t++}let o=Math.floor((e-888)/1e3);return o>=1?Math.max(t,o+12):t}function n(e,t){return i.variable(...e.flatMap(o=>[`${o}-rgb`,o]),t)}var p={display:"flex",flexDirection:"column",justifyContent:"flex-start"},B={display:"inline-block"},O={display:"block"};function j(e,t){return`${e} > ${t}, ${e} > .ssr-variant > ${t}`}var hr=[`
        [data-framer-component-type="RichTextContainer"] {
            display: ${p.display};
            flex-direction: ${p.flexDirection};
            justify-content: ${p.justifyContent};
            outline: none;
            flex-shrink: 0;
        }
    `,`
        p.framer-text,
        div.framer-text,
        figure.framer-text,
        h1.framer-text,
        h2.framer-text,
        h3.framer-text,
        h4.framer-text,
        h5.framer-text,
        h6.framer-text,
        ol.framer-text,
        ul.framer-text {
            margin: 0;
            padding: 0;
        }
    `,`
        p.framer-text,
        div.framer-text,
        h1.framer-text,
        h2.framer-text,
        h3.framer-text,
        h4.framer-text,
        h5.framer-text,
        h6.framer-text,
        li.framer-text,
        ol.framer-text,
        ul.framer-text,
        mark.framer-text,
        span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-font-family-preview, var(--framer-blockquote-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif)));
            font-style: var(--framer-font-style-preview, var(--framer-blockquote-font-style, var(--framer-font-style, normal)));
            font-weight: var(--framer-font-weight-preview, var(--framer-blockquote-font-weight, var(--framer-font-weight, 400)));
            color: var(--framer-blockquote-text-color, var(--framer-text-color, #000));
            font-size: calc(var(--framer-blockquote-font-size, var(--framer-font-size, 16px)) * var(--framer-font-size-scale, 1));
            letter-spacing: var(--framer-blockquote-letter-spacing, var(--framer-letter-spacing, 0));
            text-transform: var(--framer-blockquote-text-transform, var(--framer-text-transform, none));
            text-decoration-line: var(--framer-blockquote-text-decoration, var(--framer-text-decoration, initial));
            text-decoration-style: var(--framer-blockquote-text-decoration-style, var(--framer-text-decoration-style, initial));
            text-decoration-color: var(--framer-blockquote-text-decoration-color, var(--framer-text-decoration-color, initial));
            text-decoration-thickness: var(--framer-blockquote-text-decoration-thickness, var(--framer-text-decoration-thickness, initial));
            text-decoration-skip-ink: var(--framer-blockquote-text-decoration-skip-ink, var(--framer-text-decoration-skip-ink, initial));
            text-underline-offset: var(--framer-blockquote-text-decoration-offset, var(--framer-text-decoration-offset, initial));
            line-height: var(--framer-blockquote-line-height, var(--framer-line-height, 1.2em));
            text-align: var(--framer-blockquote-text-alignment, var(--framer-text-alignment, start));
            -webkit-text-stroke-width: var(--framer-text-stroke-width, initial);
            -webkit-text-stroke-color: var(--framer-text-stroke-color, initial);
            -moz-font-feature-settings: var(--framer-font-open-type-features, initial);
            -webkit-font-feature-settings: var(--framer-font-open-type-features, initial);
            font-feature-settings: var(--framer-font-open-type-features, initial);
            font-variation-settings: var(--framer-font-variation-axes-preview, var(--framer-font-variation-axes, normal));
            text-wrap: var(--framer-text-wrap-override, var(--framer-text-wrap));
        }
    `,`
        mark.framer-text,
        p.framer-text,
        div.framer-text,
        h1.framer-text,
        h2.framer-text,
        h3.framer-text,
        h4.framer-text,
        h5.framer-text,
        h6.framer-text,
        li.framer-text,
        ol.framer-text,
        ul.framer-text {
            background-color: var(--framer-blockquote-text-background-color, var(--framer-text-background-color, initial));
            border-radius: var(--framer-blockquote-text-background-radius, var(--framer-text-background-radius, initial));
            corner-shape: var(--framer-blockquote-text-background-corner-shape, var(--framer-text-background-corner-shape, initial));
            padding: var(--framer-blockquote-text-background-padding, var(--framer-text-background-padding, initial));
        }
    `,`
        @supports not (color: color(display-p3 1 1 1)) {
            p.framer-text,
            div.framer-text,
            h1.framer-text,
            h2.framer-text,
            h3.framer-text,
            h4.framer-text,
            h5.framer-text,
            h6.framer-text,
            li.framer-text,
            ol.framer-text,
            ul.framer-text,
            span.framer-text:not([data-text-fill]) {
                color: ${n(["--framer-blockquote-text-color","--framer-text-color"],"#000")};
                -webkit-text-stroke-color: ${n(["--framer-text-stroke-color"],"initial")};
            }

            mark.framer-text {
                background-color: ${n(["--framer-blockquote-text-background-color","--framer-text-background-color"],"initial")};
            }
        }
    `,`
        .framer-fit-text .framer-text {
            white-space: nowrap;
            white-space-collapse: preserve;
        }
    `,`
        strong.framer-text {
            font-family: var(--framer-blockquote-font-family-bold, var(--framer-font-family-bold));
            font-style: var(--framer-blockquote-font-style-bold, var(--framer-font-style-bold));
            font-weight: var(--framer-blockquote-font-weight-bold, var(--framer-font-weight-bold, bolder));
            font-variation-settings: var(--framer-blockquote-font-variation-axes-bold, var(--framer-font-variation-axes-bold));
        }
    `,`
        em.framer-text {
            font-family: var(--framer-blockquote-font-family-italic, var(--framer-font-family-italic));
            font-style: var(--framer-blockquote-font-style-italic, var(--framer-font-style-italic, italic));
            font-weight: var(--framer-blockquote-font-weight-italic, var(--framer-font-weight-italic));
            font-variation-settings: var(--framer-blockquote-font-variation-axes-italic, var(--framer-font-variation-axes-italic));
        }
    `,`
        em.framer-text > strong.framer-text {
            font-family: var(--framer-blockquote-font-family-bold-italic, var(--framer-font-family-bold-italic));
            font-style: var(--framer-blockquote-font-style-bold-italic, var(--framer-font-style-bold-italic, italic));
            font-weight: var(--framer-blockquote-font-weight-bold-italic, var(--framer-font-weight-bold-italic, bolder));
            font-variation-settings: var(--framer-blockquote-font-variation-axes-bold-italic, var(--framer-font-variation-axes-bold-italic));
        }
    `,`
        p.framer-text:not(:first-child),
        div.framer-text:not(:first-child),
        h1.framer-text:not(:first-child),
        h2.framer-text:not(:first-child),
        h3.framer-text:not(:first-child),
        h4.framer-text:not(:first-child),
        h5.framer-text:not(:first-child),
        h6.framer-text:not(:first-child),
        ol.framer-text:not(:first-child),
        ul.framer-text:not(:first-child),
        blockquote.framer-text:not(:first-child),
        table.framer-text:not(:first-child),
        figure.framer-text:not(:first-child),
        .framer-image.framer-text:not(:first-child) {
            margin-top: var(--framer-blockquote-paragraph-spacing, var(--framer-paragraph-spacing, 0));
        }
    `,`
        li.framer-text > ul.framer-text:nth-child(2),
        li.framer-text > ol.framer-text:nth-child(2) {
            margin-top: 0;
        }
    `,`
        .framer-text[data-text-fill] {
            display: ${B.display};
            background-clip: text;
            -webkit-background-clip: text;
            /* make this a transparent color if you want to visualise the clipping  */
            -webkit-text-fill-color: transparent;
            padding: max(0em, calc(calc(1.3em - var(--framer-blockquote-line-height, var(--framer-line-height, 1.3em))) / 2));
            margin: min(0em, calc(calc(1.3em - var(--framer-blockquote-line-height, var(--framer-line-height, 1.3em))) / -2));
        }
    `,`
        code.framer-text,
        code.framer-text span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-code-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
            font-style: var(--framer-blockquote-font-style, var(--framer-code-font-style, var(--framer-font-style, normal)));
            font-weight: var(--framer-blockquote-font-weight, var(--framer-code-font-weight, var(--framer-font-weight, 400)));
            color: var(--framer-blockquote-text-color, var(--framer-code-text-color, var(--framer-text-color, #000)));
            font-size: calc(var(--framer-blockquote-font-size, var(--framer-font-size, 16px)) * var(--framer-font-size-scale, 1));
            letter-spacing: var(--framer-blockquote-letter-spacing, var(--framer-letter-spacing, 0));
            line-height: var(--framer-blockquote-line-height, var(--framer-line-height, 1.2em));
        }
    `,`
        @supports not (color: color(display-p3 1 1 1)) {
            code.framer-text,
            code.framer-text span.framer-text:not([data-text-fill]) {
                color: ${n(["--framer-blockquote-text-color","--framer-code-text-color","--framer-text-color"],"#000")};
            }
        }
    `,`
        blockquote.framer-text {
            margin-block-start: initial;
            margin-block-end: initial;
            margin-inline-start: initial;
            margin-inline-end: initial;
            unicode-bidi: initial;
        }
    `,`
        a.framer-text,
        a.framer-text span.framer-text:not([data-text-fill]),
        span.framer-text[data-nested-link],
        span.framer-text[data-nested-link] span.framer-text:not([data-text-fill]) {
            /* Ensure the color is inherited from the link style rather than the parent text for nested spans */
            color: inherit;
            font-family: var(--framer-font-family-preview, var(--framer-link-font-family, var(--framer-blockquote-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif))));
            font-style: var(--framer-font-style-preview, var(--framer-link-font-style, var(--framer-blockquote-font-style, var(--framer-font-style, normal))));
            font-weight: var(--framer-font-weight-preview, var(--framer-link-font-weight, var(--framer-blockquote-font-weight, var(--framer-font-weight, 400))));
            font-size: calc(var(--framer-blockquote-font-size, var(--framer-font-size, 16px)) * var(--framer-font-size-scale, 1));
            text-transform: var(--framer-link-text-transform, var(--framer-blockquote-text-transform, var(--framer-text-transform, none)));
            /* Cursor inherit to overwrite the user agent stylesheet on rich text links. */
            cursor: var(--framer-custom-cursors, pointer);
            /* Don't inherit background styles from any parent text style. */
            background-color: initial;
            border-radius: var(--framer-link-text-background-radius, initial);
            corner-shape: var(--framer-link-text-background-corner-shape, initial);
            padding: var(--framer-link-text-background-padding, initial);
        }
    `,`
        a.framer-text,
        span.framer-text[data-nested-link] {
            color: var(--framer-link-text-color, var(--framer-blockquote-text-color, var(--framer-text-color, #000)));
            text-decoration-line: var(--framer-link-text-decoration, var(--framer-blockquote-text-decoration, var(--framer-text-decoration, initial)));
            text-decoration-style: var(--framer-link-text-decoration-style, var(--framer-blockquote-text-decoration-style, var(--framer-text-decoration-style, initial)));
            text-decoration-color: var(--framer-link-text-decoration-color, var(--framer-blockquote-text-decoration-color, var(--framer-text-decoration-color, initial)));
            text-decoration-thickness: var(--framer-link-text-decoration-thickness, var(--framer-blockquote-text-decoration-thickness, var(--framer-text-decoration-thickness, initial)));
            text-decoration-skip-ink: var(--framer-link-text-decoration-skip-ink, var(--framer-blockquote-text-decoration-skip-ink, var(--framer-text-decoration-skip-ink, initial)));
            text-underline-offset: var(--framer-link-text-decoration-offset, var(--framer-blockquote-text-decoration-offset, var(--framer-text-decoration-offset, initial)));
            /* Don't inherit background styles from any parent text style. */
            background-color: var(--framer-link-text-background-color, initial);
        }
    `,`
        @supports not (color: color(display-p3 1 1 1)) {
            a.framer-text,
            span.framer-text[data-nested-link] {
                color: ${n(["--framer-link-text-color","--framer-blockquote-text-color","--framer-text-color"],"#000")};
                background-color: ${n(["--framer-link-text-background-color"],"initial")};
                text-decoration-color: ${n(["--framer-link-text-decoration-color","--framer-text-decoration-color"],"currentcolor")};
            }
        }
    `,`
    code.framer-text a.framer-text,
    code.framer-text a.framer-text span.framer-text:not([data-text-fill]),
    code.framer-text span.framer-text[data-nested-link],
    code.framer-text span.framer-text[data-nested-link] span.framer-text:not([data-text-fill]) {
        font-family: var(--framer-code-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
        font-style: var(--framer-blockquote-font-style, var(--framer-code-font-style, var(--framer-font-style, normal)));
        font-weight: var(--framer-blockquote-font-weight, var(--framer-code-font-weight, var(--framer-font-weight, 400)));
        color: inherit;
        font-size: calc(var(--framer-blockquote-font-size, var(--framer-font-size, 16px)) * var(--framer-font-size-scale, 1));
    }
`,`
    code.framer-text a.framer-text,
    code.framer-text span.framer-text[data-nested-link] {
        color: var(--framer-link-text-color, var(--framer-blockquote-text-color, var(--framer-code-text-color, var(--framer-text-color, #000))));
    }
`,`
    @supports not (color: color(display-p3 1 1 1)) {
        code.framer-text a.framer-text,
        code.framer-text a.framer-text span.framer-text:not([data-text-fill]),
        code.framer-text span.framer-text[data-nested-link],
        code.framer-text span.framer-text[data-nested-link] span.framer-text:not([data-text-fill]) {
            color: ${n(["--framer-link-text-color","--framer-blockquote-text-color","--framer-code-text-color","--framer-text-color"],"#000")};
        }
    }
`,`
        /* Linked images keep the radius and padding of their image style. */
        a.framer-text:where(:not(.framer-image)):hover,
        a.framer-text:hover span.framer-text:not([data-text-fill]),
        span.framer-text[data-nested-link]:hover,
        span.framer-text[data-nested-link]:hover span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-font-family-preview, var(--framer-link-hover-font-family, var(--framer-link-font-family, var(--framer-blockquote-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif)))));
            font-style: var(--framer-font-style-preview, var(--framer-link-hover-font-style, var(--framer-link-font-style, var(--framer-blockquote-font-style, var(--framer-font-style, normal)))));
            font-weight: var(--framer-font-weight-preview, var(--framer-link-hover-font-weight, var(--framer-link-font-weight, var(--framer-blockquote-font-weight, var(--framer-font-weight, 400)))));
            font-size: calc(var(--framer-link-hover-font-size, var(--framer-blockquote-font-size, var(--framer-font-size, 16px))) * var(--framer-font-size-scale, 1));
            text-transform: var(--framer-link-hover-text-transform, var(--framer-link-text-transform, var(--framer-blockquote-text-transform, var(--framer-text-transform, none))));
            border-radius: var(--framer-link-hover-text-background-radius, var(--framer-link-text-background-radius, var(--framer-text-background-radius, initial)));
            corner-shape: var(--framer-link-hover-text-background-corner-shape, var(--framer-link-text-background-corner-shape, var(--framer-text-background-corner-shape, initial)));
            padding: var(--framer-link-hover-text-background-padding, var(--framer-link-text-background-padding, var(--framer-text-background-padding, initial)));
        }
    `,`
        a.framer-text:hover,
        span.framer-text[data-nested-link]:hover {
            color: var(--framer-link-hover-text-color, var(--framer-link-text-color, var(--framer-blockquote-text-color, var(--framer-text-color, #000))));
            text-decoration-line: var(--framer-link-hover-text-decoration, var(--framer-link-text-decoration, var(--framer-blockquote-text-decoration, var(--framer-text-decoration, initial))));
            text-decoration-style: var(--framer-link-hover-text-decoration-style, var(--framer-link-text-decoration-style, var(--framer-blockquote-text-decoration-style, var(--framer-text-decoration-style, initial))));
            text-decoration-color: var(--framer-link-hover-text-decoration-color, var(--framer-link-text-decoration-color, var(--framer-blockquote-text-decoration-color, var(--framer-text-decoration-color, initial))));
            text-decoration-thickness: var(--framer-link-hover-text-decoration-thickness, var(--framer-link-text-decoration-thickness, var(--framer-blockquote-text-decoration-thickness, var(--framer-text-decoration-thickness, initial))));
            text-decoration-skip-ink: var(--framer-link-hover-text-decoration-skip-ink, var(--framer-link-text-decoration-skip-ink, var(--framer-blockquote-text-decoration-skip-ink, var(--framer-text-decoration-skip-ink, initial))));
            text-underline-offset: var(--framer-link-hover-text-decoration-offset, var(--framer-link-text-decoration-offset, var(--framer-blockquote-text-decoration-offset, var(--framer-text-decoration-offset, initial))));
            background-color: var(--framer-link-hover-text-background-color, var(--framer-link-text-background-color, var(--framer-text-background-color, initial)));
        }
    `,`
    @supports not (color: color(display-p3 1 1 1)) {
        a.framer-text:hover,
        span.framer-text[data-nested-link]:hover {
            color: ${n(["--framer-link-hover-text-color","--framer-link-text-color","--framer-blockquote-text-color","--framer-text-color"],"#000")};
            background-color: ${n(["--framer-link-hover-text-background-color","--framer-link-text-background-color","--framer-text-background-color"],"initial")};
            text-decoration-color: ${n(["--framer-link-hover-text-decoration-color","--framer-link-text-decoration-color","--framer-text-decoration-color"],"currentcolor")};
        }
    }
    `,`
        code.framer-text a.framer-text:hover,
        code.framer-text span.framer-text[data-nested-link]:hover {
            color: var(--framer-link-hover-text-color, var(--framer-link-text-color, var(--framer-blockquote-text-color, var(--framer-code-text-color, var(--framer-text-color, #000)))));
        }
    `,`
    @supports not (color: color(display-p3 1 1 1)) {
        code.framer-text a.framer-text:hover,
        code.framer-text span.framer-text[data-nested-link]:hover {
            color: ${n(["--framer-link-hover-text-color","--framer-link-text-color","--framer-blockquote-text-color","--framer-code-text-color","--framer-text-color"],"#000")};
        }
    }
   `,`
        a.framer-text:where(:not(.framer-image))[data-framer-page-link-current],
        a.framer-text[data-framer-page-link-current] span.framer-text:not([data-text-fill]),
        span.framer-text[data-framer-page-link-current],
        span.framer-text[data-framer-page-link-current] span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-font-family-preview, var(--framer-link-current-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif))));
            font-style: var(--framer-font-style-preview, var(--framer-link-current-font-style, var(--framer-link-font-style, var(--framer-font-style, normal))));
            font-weight: var(--framer-font-weight-preview, var(--framer-link-current-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400))));
            font-size: calc(var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px))) * var(--framer-font-size-scale, 1));
            text-transform: var(--framer-link-current-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none)));
            border-radius: var(--framer-link-current-text-background-radius, var(--framer-link-text-background-radius, initial));
            corner-shape: var(--framer-link-current-text-background-corner-shape, var(--framer-link-text-background-corner-shape, initial));
            padding: var(--framer-link-current-text-background-padding, var(--framer-link-text-background-padding, initial));
        }
    `,`
        a.framer-text[data-framer-page-link-current],
        span.framer-text[data-framer-page-link-current] {
            color: var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-text-color, #000)));
            text-decoration-line: var(--framer-link-current-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, initial)));
            text-decoration-style: var(--framer-link-current-text-decoration-style, var(--framer-link-text-decoration-style, var(--framer-text-decoration-style, initial)));
            text-decoration-color: var(--framer-link-current-text-decoration-color, var(--framer-link-text-decoration-color, var(--framer-text-decoration-color, initial)));
            text-decoration-thickness: var(--framer-link-current-text-decoration-thickness, var(--framer-link-text-decoration-thickness, var(--framer-text-decoration-thickness, initial)));
            text-decoration-skip-ink: var(--framer-link-current-text-decoration-skip-ink, var(--framer-link-text-decoration-skip-ink, var(--framer-text-decoration-skip-ink, initial)));
            text-underline-offset: var(--framer-link-current-text-decoration-offset, var(--framer-link-text-decoration-offset, var(--framer-text-decoration-offset, initial)));
            background-color: var(--framer-link-current-text-background-color, var(--framer-link-text-background-color, var(--framer-text-background-color, initial)));
        }
    `,`
        @supports not (color: color(display-p3 1 1 1)) {
            a.framer-text[data-framer-page-link-current],
            span.framer-text[data-framer-page-link-current]{
                color: ${n(["--framer-link-current-text-color","--framer-link-text-color","--framer-text-color"],"#000")};
                background-color: ${n(["--framer-link-current-text-background-color","--framer-link-text-background-color","--framer-text-background-color"],"initial")};
                text-decoration-color: ${n(["--framer-link-current-text-decoration-color","--framer-link-text-decoration-color","--framer-text-decoration-color"],"currentcolor")};
            }
        }
    `,`
        code.framer-text a.framer-text[data-framer-page-link-current],
        code.framer-text a.framer-text[data-framer-page-link-current] span.framer-text:not([data-text-fill]),
        code.framer-text span.framer-text[data-framer-page-link-current],
        code.framer-text span.framer-text[data-framer-page-link-current] span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-code-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
            font-style: var(--framer-code-font-style, var(--framer-font-style, normal));
            font-weight: var(--framer-code-font-weight, var(--framer-font-weight, 400));
            color: inherit;
            font-size: calc(var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px))) * var(--framer-font-size-scale, 1));
        }
    `,`
        code.framer-text a.framer-text[data-framer-page-link-current],
        code.framer-text span.framer-text[data-framer-page-link-current] {
            color: var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-code-text-color, var(--framer-text-color, #000))));
        }
    `,`
        @supports not (color: color(display-p3 1 1 1)) {
            code.framer-text a.framer-text[data-framer-page-link-current],
            code.framer-text a.framer-text[data-framer-page-link-current] span.framer-text:not([data-text-fill]),
            code.framer-text span.framer-text[data-framer-page-link-current],
            code.framer-text span.framer-text[data-framer-page-link-current] span.framer-text:not([data-text-fill]) {
                color: ${n(["--framer-link-current-text-color","--framer-link-text-color","--framer-code-text-color","--framer-text-color"],"#000")};
                background-color: ${n(["--framer-link-current-text-background-color","--framer-link-text-background-color","--framer-text-background-color"],"initial")};
            }
        }
    `,`
        a.framer-text:where(:not(.framer-image))[data-framer-page-link-current]:hover,
        a.framer-text[data-framer-page-link-current]:hover span.framer-text:not([data-text-fill]),
        span.framer-text[data-framer-page-link-current]:hover,
        span.framer-text[data-framer-page-link-current]:hover span.framer-text:not([data-text-fill]) {
            color: inherit;
            font-family: var(--framer-font-family-preview, var(--framer-link-hover-font-family, var(--framer-link-current-font-family, var(--framer-link-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif)))));
            font-style: var(--framer-font-style-preview, var(--framer-link-hover-font-style, var(--framer-link-current-font-style, var(--framer-link-font-style, var(--framer-font-style, normal)))));
            font-weight: var(--framer-font-weight-preview, var(--framer-link-hover-font-weight, var(--framer-link-current-font-weight, var(--framer-link-font-weight, var(--framer-font-weight, 400)))));
            font-size: calc(var(--framer-link-hover-font-size, var(--framer-link-current-font-size, var(--framer-link-font-size, var(--framer-font-size, 16px)))) * var(--framer-font-size-scale, 1));
            text-transform: var(--framer-link-hover-text-transform, var(--framer-link-current-text-transform, var(--framer-link-text-transform, var(--framer-text-transform, none))));
            border-radius: var(--framer-link-hover-text-background-radius, var(--framer-link-current-text-background-radius, var(--framer-link-text-background-radius, initial)));
            corner-shape: var(--framer-link-hover-text-background-corner-shape, var(--framer-link-current-text-background-corner-shape, var(--framer-link-text-background-corner-shape, initial)));
            padding: var(--framer-link-hover-text-background-padding, var(--framer-link-current-text-background-padding, var(--framer-link-text-background-padding, initial)));
        }
    `,`
        a.framer-text[data-framer-page-link-current]:hover,
        span.framer-text[data-framer-page-link-current]:hover {
            color: var(--framer-link-hover-text-color, var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-text-color, #000))));
            text-decoration-line: var(--framer-link-hover-text-decoration, var(--framer-link-current-text-decoration, var(--framer-link-text-decoration, var(--framer-text-decoration, initial))));
            text-decoration-style: var(--framer-link-hover-text-decoration-style, var(--framer-link-current-text-decoration-style, var(--framer-link-text-decoration-style, var(--framer-text-decoration-style, initial))));
            text-decoration-color: var(--framer-link-hover-text-decoration-color, var(--framer-link-current-text-decoration-color, var(--framer-link-text-decoration-color, var(--framer-text-decoration-color, initial))));
            text-decoration-thickness: var(--framer-link-hover-text-decoration-thickness, var(--framer-link-current-text-decoration-thickness, var(--framer-link-text-decoration-thickness, var(--framer-text-decoration-thickness, initial))));
            text-decoration-skip-ink: var(--framer-link-hover-text-decoration-skip-ink, var(--framer-link-current-text-decoration-skip-ink, var(--framer-link-text-decoration-skip-ink, var(--framer-text-decoration-skip-ink, initial))));
            text-underline-offset: var(--framer-link-hover-text-decoration-offset, var(--framer-link-current-text-decoration-offset, var(--framer-link-text-decoration-offset, var(--framer-text-decoration-offset, initial))));
            background-color: var(--framer-link-hover-text-background-color, var(--framer-link-current-text-background-color, var(--framer-link-text-background-color, initial)));
        }
    `,`
        @supports not (color: color(display-p3 1 1 1)) {
            a.framer-text[data-framer-page-link-current]:hover,
            span.framer-text[data-framer-page-link-current]:hover {
                color: ${n(["--framer-link-hover-text-color","--framer-link-current-text-color","--framer-link-text-color","--framer-code-text-color","--framer-text-color"],"#000")};
                background-color: ${n(["--framer-link-hover-text-background-color","--framer-link-current-text-background-color","--framer-link-text-background-color"],"initial")};
                text-decoration-color: ${n(["--framer-link-hover-text-decoration-color","--framer-link-current-text-decoration-color","--framer-link-text-decoration-color","--framer-text-decoration-color"],"currentcolor")};
            }
        }
    `,`
        code.framer-text a.framer-text[data-framer-page-link-current]:hover,
        code.framer-text span.framer-text[data-framer-page-link-current]:hover {
            color: var(--framer-link-hover-text-color, var(--framer-link-current-text-color, var(--framer-link-text-color, var(--framer-code-text-color, var(--framer-text-color, #000)))));
        }
    `,`
        @supports not (color: color(display-p3 1 1 1)) {
            code.framer-text a.framer-text[data-framer-page-link-current]:hover,
            code.framer-text a.framer-text[data-framer-page-link-current]:hover span.framer-text:not([data-text-fill]),
            code.framer-text span.framer-text[data-framer-page-link-current]:hover,
            code.framer-text span.framer-text[data-framer-page-link-current]:hover span.framer-text:not([data-text-fill]) {
                color: ${n(["--framer-link-hover-text-color","--framer-link-current-text-color","--framer-link-text-color","--framer-code-text-color","--framer-text-color"],"#000")};
                background-color: ${n(["--framer-link-hover-text-background-color","--framer-link-current-text-background-color","--framer-link-text-background-color"],"initial")};
            }
        }
    `,`
        .framer-image.framer-text {
            display: ${O.display};
            max-width: 100%;
            height: auto;
        }
    `,`
        /* A linked image gets its image style on both the link and the image; only the image draws the border and shadow. */
        a.framer-image.framer-text {
            border: none;
            box-shadow: none;
        }
    `,`
        .text-styles-preset-reset.framer-text {
            --framer-font-family: Inter, Inter Placeholder, sans-serif;
            --framer-font-style: normal;
            --framer-font-weight: 500;
            --framer-text-color: #000;
            --framer-font-size: 16px;
            --framer-letter-spacing: 0;
            --framer-text-transform: none;
            --framer-text-decoration: none;
            --framer-text-decoration-style: none;
            --framer-text-decoration-color: none;
            --framer-text-decoration-thickness: none;
            --framer-text-decoration-skip-ink: none;
            --framer-text-decoration-offset: none;
            --framer-line-height: 1.2em;
            --framer-text-alignment: start;
            --framer-font-open-type-features: normal;
            --framer-text-background-color: initial;
            --framer-text-background-radius: initial;
            --framer-text-background-corner-shape: initial;
            --framer-text-background-padding: initial;
        }
    `,`
        ol.framer-text {
            --list-style-type: decimal;
        }
    `,`
        ul.framer-text,
        ol.framer-text {
            padding-inline-start: 0;
            position: relative;
        }
    `,`
        li.framer-text {
            counter-increment: list-item;
            list-style: "";
            padding-inline-start: 2ch;
        }
    `,`
        ol.framer-text > li.framer-text {
            padding-inline-start: calc(calc(var(${$}, 1) + 1) * 1ch);
        }
    `,`
        ol.framer-text > li.framer-text::before {
            position: absolute;
            inset-inline-start: 0;
            content: counter(list-item, var(--list-style-type)) ".";
            font-variant-numeric: tabular-nums;
        }
    `,`
        ul.framer-text > li.framer-text::before {
            position: absolute;
            inset-inline-start: 0;
            content: "\u2022";
        }
    `,`
        .framer-table-wrapper {
            overflow-x: auto;
        }
    `,`
        table.framer-text,
        .framer-table-wrapper table.framer-text {
            border-collapse: separate;
            border-spacing: 0;
            table-layout: auto;
            word-break: normal;
            width: 100%;
        }
    `,`
        td.framer-text,
        th.framer-text {
            min-width: 16ch;
            overflow-wrap: anywhere;
            vertical-align: top;
        }
    `,`
        ${j('.framer-text-module[data-width="fill"]',":first-child")} {
            width: 100% !important;
        }
    `],C="--text-truncation-display-inline-for-safari-16",K="--text-truncation-display-none-for-safari-16",F="--text-truncation-line-break-for-safari-16",T=["div.framer-text","p.framer-text","h1.framer-text","h2.framer-text","h3.framer-text","h4.framer-text","h5.framer-text","h6.framer-text","ol.framer-text","ul.framer-text","li.framer-text","blockquote.framer-text",".framer-text.framer-image"],G="(background: -webkit-named-image(i))",Z="(contain-intrinsic-size: inherit)",gr=[`@supports ${G} and (not ${Z}) {
        /* Render block-like elements inline when text is truncated, otherwise default to user agent (revert)  */
        ${T.join(", ")} { display: var(${C}, revert) }

        /* Add a line break after each block-like element that we render inline, to resemble the block-like behavior */
        ${T.map(e=>`${e}::after`).join(", ")} { content: var(${F}); white-space: pre; }

        /* Don't render modules (e.g. videos, code-blocks), or tables when text is truncated, because often these can't be truncated and their children might be block elements */
        .framer-text.framer-text-module,
        .framer-text.framer-table-wrapper { display: var(${K}, revert) }

        /* Render text-fill elements inline when text is truncated, otherwise default to their default value (e.g. inline-block) */
        p.framer-text[data-text-fill] { display: var(${C}, ${B.display}) }
    }`];export{J as a,Q as b,U as c,X as d,Y as e,b as f,w as g,rr as h,er as i,tr as j,i as k,ar as l,or as m,nr as n,ir as o,fr as p,lr as q,cr as r,u as s,H as t,mr as u,xr as v,$ as w,vr as x,p as y,hr as z,C as A,K as B,F as C,gr as D};
//# sourceMappingURL=https://app.framerstatic.com/chunk-VIFBAVOY.mjs.map
