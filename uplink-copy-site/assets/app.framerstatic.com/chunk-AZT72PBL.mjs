import{b as O,c as R,d as V}from"https://app.framerstatic.com/chunk-5GXVFY3X.mjs";import{a as e}from"https://app.framerstatic.com/chunk-AHMVXJCZ.mjs";import{a as s}from"https://app.framerstatic.com/chunk-LC353KWP.mjs";import{a as l}from"https://app.framerstatic.com/chunk-XNIFBQQE.mjs";import{a as o,b as r,c}from"https://app.framerstatic.com/chunk-ZKRSIHWU.mjs";import{a as I,b as L,c as f}from"https://app.framerstatic.com/chunk-ISW56VHA.mjs";import{a as F}from"https://app.framerstatic.com/chunk-QFU6OGL3.mjs";import{a as M}from"https://app.framerstatic.com/chunk-2FCXHKEL.mjs";import{b as H}from"https://app.framerstatic.com/chunk-4JY5UMT2.mjs";import{a as ar}from"https://app.framerstatic.com/chunk-SWYZG2NI.mjs";import{e as y}from"https://app.framerstatic.com/chunk-WLHSDIGQ.mjs";var u=y(ar());var t="shadow";var tr=n=>n==="light"?c:e,lr=n=>Object.entries(n).map(([i,d])=>`${i}: ${d};`).join(`
`);function m(n,i,d={}){let B=tr(n),k={};return Object.entries(B).forEach(([x,v])=>{if(x in d){let p=d[x];if(!p)return;k[I(x,l)]=p;return}if(v in i){let p=i[v];if(!p)return;k[I(x,l)]=p}}),lr(k)}var E={[c.tint]:c.componentTint,[c.tintDark]:r.purple140,[c.tintDimmed]:c.componentTintDimmed,[r.blue75]:r.purple150,[o(r.blue60,.4)]:o(r.purple100,.4),[o(r.blue60,.8)]:o(r.purple100,.8),[o(c.tint,.05)]:o(c.componentTint,.05),[o(c.tint,.08)]:o(c.componentTint,.08),[o(c.tint,.1)]:o(c.componentTint,.1),[o(c.tint,.15)]:o(c.componentTint,.15),[o(c.tint,.5)]:o(c.componentTint,.5)},G={[e.tint]:e.componentTint,[e.tintDark]:r.purple95,[e.tintDimmed]:e.componentTintDimmed,[r.blue75]:r.purple150,[o(r.blue60,.4)]:o(r.purple90,.4),[o(r.blue60,.8)]:o(r.purple90,.8),[o(e.tint,.05)]:o(e.componentTint,.05),[o(e.tint,.08)]:o(e.componentTint,.08),[o(e.tint,.1)]:o(e.componentTint,.1),[o(e.tint,.15)]:o(e.componentTint,.15),[o(e.tint,.5)]:o(e.componentTint,.5)},W={assetVectorBadgeBackground:c.assetVectorBadgeBackground,buttonBackgroundPrimaryActive:r.purple150,buttonWithDepthPrimaryShadow:c.buttonWithDepthPrimaryComponentShadow,buttonWithDepthPrimaryShadowHover:"0px 1px 2px 0px rgba(119, 51, 255, 0.15), 0px 2px 4px 0px rgba(119, 51, 255, 0.3)",layerItemIconDimmed:c.layerItemIconComponentDimmed},$={assetVectorBadgeBackground:e.assetVectorBadgeBackground,buttonBackgroundPrimaryActive:r.purple150,layerItemIconDimmed:e.layerItemIconComponentDimmed},nr={avatarTinted:`inset 0 0 0 1px ${o(c.componentTint,.15)}`,distributionSliderKnobSelected:`inset 0 0 0 3px white, inset 0 0 0 4px ${c.componentTint}, 0 0 0 1px ${c.componentTint}`},sr={tokens:nr,scope:t},mr={avatarTinted:`inset 0 0 0 1px ${o(e.componentTint,.15)}`,distributionSliderKnobSelected:`inset 0 0 0 3px white, inset 0 0 0 4px ${e.componentTint}, 0 0 0 1px ${e.componentTint}`},ir={tokens:mr,scope:t},P={light:`
	${m("light",E,W)}
	${f([sr])}
`,dark:`
	${m("dark",G,$)}
	${f([ir])}
`},D={light:m("light",E,{...W,canvasBackground:c.canvasComponentOverlayEditModeBackground,rulerBackground:"#DFCEFF",rulerBorderColor:c.rulerComponentOverlayEditModeBorderColor,rulerTextColor:c.rulerComponentOverlayEditModeTextColor,rulerTickColor:c.rulerComponentOverlayEditModeTickColor,rulerFadeOut:"rgba(136, 85, 255, 0)"}),dark:m("dark",G,{...$,canvasBackground:e.canvasComponentOverlayEditModeBackground,rulerBackground:"#332455",rulerBorderColor:e.rulerComponentOverlayEditModeBorderColor,rulerTextColor:e.rulerComponentOverlayEditModeTextColor,rulerTickColor:e.rulerComponentOverlayEditModeTickColor,rulerFadeOut:"rgba(136, 85, 255, 0)"})};var K={tint:r.white100,buttonBackgroundPrimary:r.white100,buttonBackgroundPrimaryHover:o(r.white100,.98),buttonBackgroundPrimaryActive:o(r.white100,.96),buttonTextPrimary:r.dark90,swatchBackgroundPlaceholderForLink:r.dark50},j=m("light",{},K),z=m("dark",{},K);var g="0px 3px 6px 0px rgba(0, 0, 0, 0.08)",C=`${g}, 0px 0px 0px 1px rgba(0, 0, 0, 0.05)`,b=`inset 0px 0px 0px 1px ${o(r.white100,.07)}`;var dr={popoverInset:b},pr={tokens:dr,scope:t},q=f([pr]);var gr={panelBackground:e.popoverBackground,panelDivider:e.popoverDivider,popupButtonBackground:r.dark71,radioButtonBackground:r.dark71,segmentedControlDivider:r.dark60,segmentedControlItemBackgroundSelected:r.dark63,checkboxLabel:r.light80,menuBackground:r.dark81,menuSeparator:o(r.white100,.07),menuBackgroundActive:r.dark74,menuText:r.white100,menuTextActive:r.white100,tabsBackgroundSelected:r.dark83},ur={menu:`${g}, 0px 0px 0px 1px ${r.dark72}`},xr={menuBackgroundActive:r.light59,menuText:r.dark80,menuTextActive:r.dark90,inputBackground:r.light55,inputText:r.dark90},Br={tokens:xr,scope:l},U=f([Br]),kr={tokens:gr,scope:l},br={tokens:ur,scope:t},N=f([kr,br]);var T={avatar:"inset 0 0 0 1px rgba(0, 0, 0, 0.1)",avatarOverlap:`0px 0px 0px 1.5px ${s.panelBackground}, inset 0 0 0 1px ${o(r.white100,.05)}`,avatarTinted:`inset 0 0 0 1px ${o(c.tint,.15)}`,buttonSelected:"0px 2px 4px 0px rgba(0, 0, 0, 0.1), 0px 1px 0px 0px rgba(0, 0, 0, 0.05)",canvasTooltip:"0px 3px 6px 0px rgba(0, 0, 0, 0.08), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)",card:"0 5px 20px rgba(0, 0, 0, 0.15)",checkbox:"inset 0 0 0 1px rgba(0, 0, 0, 0.1)",checkboxDarker:"inset 0 0 0 1px rgba(0, 0, 0, 0.1)",checkboxChecked:"none",checkboxDarkerChecked:"none",distributionSliderBar:"inset 0 0 0 1px var(--framer-fresco-gradientStopSliderBorder-color, rgba(0, 0, 0, 0.05))",distributionSliderKnob:"inset 0 0 0 3px white, inset 0 0 0 4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1)",distributionSliderKnobSelected:`inset 0 0 0 3px white, inset 0 0 0 4px ${c.tint}, 0 0 0 1px ${c.tint}`,gradientSliderKnobSelected:`inset 0 0 0 3px white, inset 0 0 0 4px ${s.controlTextActive}, 0 0 0 1px ${s.controlTextActive}`,insertImage:"0px 4px 8px 0px rgba(0, 0, 0, 0.1)",menu:C,modal:C,modalInset:"none",popover:C,popoverInset:"none",popoverDropShadow:"drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.08)) drop-shadow(0px 5px 20px rgba(0, 0, 0, 0.1))",projectMenuButton:"0px 0px 0px 1px rgba(0, 0, 0, 0.02), 0px 1px 0px 0px rgba(0, 0, 0, 0.05), 0px 2px 4px 0px rgba(0, 0, 0, 0.1)",radioButton:"inset 0 0 0 1px rgba(0, 0, 0, 0.08)",radioButtonChecked:"none",settingsCard:"0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 2px 10px 0px rgba(0, 0, 0, 0.05)",domainsCard:"0px 0.11px 0.24px 0px rgba(49, 54, 59, 0.04), 0px 0.31px 0.68px 0px rgba(49, 54, 59, 0.02), 0px 0.75px 1.63px 0px rgba(49, 54, 59, 0.02), 0px 2.5px 5.4px -1.27px rgba(49, 54, 59, 0.01)",sideOverlay:"0px 3px 6px 0px rgba(0, 0, 0, 0.08), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)",segmentedControlItemSelected:"0px 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 1px 0px 0px rgba(0, 0, 0, 0.04), 0px 2px 4px 0px rgba(0, 0, 0, 0.08)",multiComboBoxToken:"0px 0px 0px 1px rgba(0, 0, 0, 0.03)",sliderKnob:"0px 2px 4px 0px rgba(0, 0, 0, 0.1), 0px 1px 0px 0px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)",toggleTack:"0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 2px 10px 0px rgba(0, 0, 0, 0.05)",toggleMonochrome:"none",settingsImageClearButton:"0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 0.5px 0px 0px rgba(0, 0, 0, 0.1)"};var a=s.tint,Q=`
	${m("light",{},{panelLabelActive:a,panelAlignmentIcon:a,controlTextActive:a,sliderTrackActive:a,segmentedControlItemTextSelectedHover:s.tintDark,anchorGridSelected:a,checkboxBackgroundChecked:a,toggleBackgroundChecked:a,fillIconBorderActive:a,fillIconSolidFillActive:`color-mix(in srgb, ${a} 40%, transparent)`,fillIconLinearFillActive:`color-mix(in srgb, ${a} 80%, transparent)`,fillIconRadialFillActive:`color-mix(in srgb, ${a} 80%, transparent)`,fillIconConicFillInnerActive:a,fillIconImageFillInnerActive:`color-mix(in srgb, ${a} 40%, transparent)`,fillIconImageFillOuterActive:a})}
	${f([{tokens:{gradientSliderKnobSelected:T.gradientSliderKnobSelected},scope:t}])}
`;var Tr={tooltipBackground:r.dark81},hr={tokens:Tr,scope:l},J=f([hr]);var X={avatar:`inset 0 0 0 1px ${o(r.white100,.1)}`,avatarOverlap:`0px 0px 0px 1.5px ${s.panelBackground}, inset 0 0 0 1px ${o(r.white100,.05)}`,avatarTinted:`inset 0 0 0 1px ${o(e.tint,.15)}`,buttonSelected:"0px 2px 4px 0px rgba(0, 0, 0, 0.3), 0px 1px 0px 0px rgba(0, 0, 0, 0.05)",canvasTooltip:"0px 3px 6px 0px rgba(0, 0, 0, 0.08), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.07)",card:"0 5px 20px rgba(0, 0, 0, 0.3)",checkbox:"inset 0 0 0 1px rgba(255, 255, 255, 0.1)",checkboxDarker:"inset 0 0 0 1px rgba(255, 255, 255, 0.1)",checkboxChecked:"inset 0 0 0 1px rgba(255, 255, 255, 0.2)",checkboxDarkerChecked:"inset 0 0 0 1px rgba(255, 255, 255, 0.2)",distributionSliderBar:"inset 0 0 0 1px var(--framer-fresco-gradientStopSliderBorder-color, rgba(0, 0, 0, 0.05))",distributionSliderKnob:"inset 0 0 0 3px white, inset 0 0 0 4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1)",distributionSliderKnobSelected:`inset 0 0 0 3px white, inset 0 0 0 4px ${e.tint}, 0 0 0 1px ${e.tint}`,gradientSliderKnobSelected:`inset 0 0 0 3px white, inset 0 0 0 4px rgba(0, 0, 0, 0.1), 0 0 0 1px ${e.panelBackground}, 0 0 0 2px ${s.controlTextActive}`,insertImage:"0px 4px 8px 0px rgba(0, 0, 0, 0.2)",menu:`${g}, 0px 0px 0px 1px ${r.dark80}`,modal:g,modalInset:b,popover:g,popoverInset:b,popoverDropShadow:"drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.08)) drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.2))",projectMenuButton:"none",radioButton:"inset 0 0 0 1px rgba(0, 0, 0, 0.05)",radioButtonChecked:"inset 0 0 0 1px rgba(255, 255, 255, 0.2)",settingsCard:"0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 2px 10px 0px rgba(0, 0, 0, 0.05)",domainsCard:"0px 0.11px 0.24px 0px rgba(0, 0, 0, 0.14), 0px 0.31px 0.68px 0px rgba(0, 0, 0, 0.08), 0px 0.75px 1.63px 0px rgba(0, 0, 0, 0.07), 0px 2.5px 5.4px -1.27px rgba(0, 0, 0, 0.04)",sideOverlay:"0px 3px 6px 0px rgba(0, 0, 0, 0.08), 0px 0px 0px 1px rgba(0, 0, 0, 0.05), inset 1px 0 0 0 #222222",segmentedControlItemSelected:"inset 0 0 0 1px rgba(255, 255, 255, 0.03)",multiComboBoxToken:"none",sliderKnob:"none",toggleTack:"0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 2px 10px 0px rgba(0, 0, 0, 0.05)",toggleMonochrome:"inset 0 0 0 1px rgba(255, 255, 255, 0.1)",settingsImageClearButton:"0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 0.5px 0px 0px rgba(0, 0, 0, 0.1)"};var Oo=L(T,t),Y={tokens:T,scope:t},Z={tokens:X,scope:t};var vr={tokens:c,scope:l},Cr={tokens:e,scope:l},_=f([vr,Y]),rr=f([Cr,Z]);var Zo={properties:`
		body[data-framer-theme="light"] & {
			${Q}
		}
`,component:`
		body[data-framer-theme="light"] & {
			${P.light}
		}
		body[data-framer-theme="dark"] & {
			${P.dark}
		}
`,componentOverlayEditMode:`
		body[data-framer-theme="light"] & {
			${D.light}
		}
		body[data-framer-theme="dark"] & {
			${D.dark}
		}
`,popover:`
		body[data-framer-theme="dark"] & {
			${N}
		}
		body[data-framer-theme="light"] & {
			${U}
		}
`,darkOnDarkPopoutWindow:`
		body[data-framer-theme="dark"] & {
			${q}
		}
`,tooltipVariantLighter:`
		body[data-framer-theme="dark"] & {
			${J}
		}
`,darkOnDarkModal:`
		body[data-framer-theme="dark"] & {
			${O}
		}
`,modalVariantDefault:`
		body[data-framer-theme="dark"] & {
			${R}
		}
`,modalVariantDarker:`
		body[data-framer-theme="dark"] & {
			${V}
		}
`,inverted:`
		body[data-framer-theme="light"] & {
			${rr}
		}
		body[data-framer-theme="dark"] & {
			${_}
		}
`,onPageEditing:`
		body[data-framer-theme="light"] & {
			${j}
		}
		body[data-framer-theme="dark"] & {
			${z}
		}
`},or={properties:"p1umhcny",component:"c12c8kmr",componentOverlayEditMode:"c752w4z",popover:"p1ng92sv",darkOnDarkPopoutWindow:"d1cyscb0",tooltipVariantLighter:"t1f7bw7u",darkOnDarkModal:"d1ysjty9",modalVariantDefault:"m1js5p3h",modalVariantDarker:"m7h4j38",inverted:"i800e5d",onPageEditing:"opnx597"},er="wedhysz";var h=y(M());function Sr(n){return n!==!1&&n!==void 0}var w=u.default.createContext(void 0);w.displayName="BaseThemeContext";var A=u.default.createContext(void 0);A.displayName="ThemeOverrideModeContext";function cr(){return u.default.useContext(w)}function yr(){return u.default.useContext(A)}var Ir=u.default.forwardRef(function({mode:i,children:d,className:B,...k},x){let v=yr(),p=cr(),S=i||v||p,fr=Sr(S)?or[S]:void 0;return(0,h.jsx)(A.Provider,{value:S,children:(0,h.jsx)("div",{ref:x,className:F(er,fr,B),...k,children:d})})}),ce=u.default.memo(function({mode:i,children:d}){let B=cr();return H(B===void 0,"Nested BaseTheme components are not allowed. BaseTheme should only be used once per application root."),(0,h.jsx)(w.Provider,{value:i,children:(0,h.jsx)(Ir,{children:d})})});export{Oo as a,cr as b,yr as c,Ir as d,ce as e};
//# sourceMappingURL=https://app.framerstatic.com/chunk-AZT72PBL.mjs.map
