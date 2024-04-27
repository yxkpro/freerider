@charset "UTF-8";

/* --- vw_base.css --- */

.vw-floatcontainer:after {
	clear: both;
	content: ".";
	display: block;
	font-size: 1pt;
	height: 0;
	visibility: hidden;
}

@font-face {
	font-family: 'FontAwesome';
	src: url('//community.freeriderhd.com/vault/resources/fonts/font-awesome/fontawesome-webfont.eot?v=4.3.0');
	src: url('//community.freeriderhd.com/vault/resources/fonts/font-awesome/fontawesome-webfont.eot?#iefix&v=4.3.0') format('embedded-opentype'), url('//community.freeriderhd.com/vault/resources/fonts/font-awesome/fontawesome-webfont.woff2?v=4.3.0') format('woff2'), url('//community.freeriderhd.com/vault/resources/fonts/font-awesome/fontawesome-webfont.woff?v=4.3.0') format('woff'), url('//community.freeriderhd.com/vault/resources/fonts/font-awesome/fontawesome-webfont.ttf?v=4.3.0') format('truetype'), url('//community.freeriderhd.com/vault/resources/fonts/font-awesome/fontawesome-webfont.svg?v=4.3.0#fontawesomeregular') format('svg');
	font-weight: normal;
	font-style: normal;
}

.vw-font-awesome {
	font-family: FontAwesome;
}

.vw-inline-prefix {
	background: rgb(211, 211, 211) url('styles/kanoapps-baisik/xenforo/gradients/form-button-white-25px.png') repeat-x;;
	border: 1px solid rgb(211, 211, 211);
border-radius: 6px;;
	font-size: 0.8em;
	font-weight: bold;
	padding: 0.1em 0.3em;
}

/* --- vw_bbcode.css --- */

/* ###### LINKS ###### */
.vw-link, .vw-link:link, .vw-link:visited, .vw-link:hover, .vw-link[href]:hover {
	
}

.vw-link.new, .vw-link.new:link, .vw-link.new:visited, .vw-link.new:hover, .vw-link.new[href]:hover {
	color: rgb(204, 0, 0);
}

.vw-link-preview {
	background-color: rgb(255,255,255);
	border: 1px solid rgb(183, 183, 183);
border-top-width: 5px;
border-top-style: solid;
border-right-width: 1px;
border-right-style: solid;
border-bottom-width: 1px;
border-bottom-style: solid;
border-left-width: 1px;
border-left-style: solid;
	border-radius: ;
	box-shadow: 0px 5px 5px rgba(0,0,0,0.6);
	display: block;
	max-width: 300px;
	min-width: 200px;
	padding: 0.5em 1em;
	position: absolute;
	z-index: 1000;
}

.vw-link-preview-content {
	display: block;
}

.vw-link-preview-more {
	border-top: 1px dotted rgb(200,200,200);
	display: block;
	font-weight: bold;
	margin-top: 0.5em;
	overflow: hidden;
	padding-top: 0.3em;
	text-align: right;
}

.vw-footnote, .vw-footnote-up {
	font-size: 80%;
	vertical-align: super;
}

.vw-footnote-up {
	padding-right: 0.5em;
}

.vw-footnote-dupe {
	font-style: italic;
}

.vw-widget {
	margin-bottom: 1em;
	margin-top: 1em;
}

.vw-widget-multi {
	border-top: 1px dotted rgb(200,200,200);
	border-bottom: 1px dotted rgb(200,200,200);
}

.vw-widget-multi-page {
	margin: 0 0.5em;
}

.vw-widget .vw-block-content, .vw-content .vw-widget .vw-block-content {
	padding: 0.5em 0.5em 1.5em !important;
}

.vw-widget-multi-page .vw-head {
	font-size: 80%;
}

.vw-widget > h3 {
	font-size: 80%;
	margin: 0;
}

.vw-widget > .vw-block-content > ul, .vw-widget > .vw-block-content > ol {
	margin: 0;
}

.vw-widget-threads h3, .vw-widget-threads dl {
	margin: 0;
}

.vw-widget-multi-page > img:first-child {
	padding-right: 0.5em;
}

.vw-widget-multi-page {
	margin-top: 1em;
}

.vw-widget-multi-scroll {
	margin: 0.5em 0 1em;
	position: relative;
	text-align: center;
}

.vw-widget-multi-scroll > * {
	cursor: pointer;
}

.vw-widget-scroll-jump > * {
	border: 2px solid transparent;
	cursor: pointer;
	display: inline-block;
	vertical-align: middle;
}

.vw-widget-scroll-jump > .vw-widget-scroll-jumped {
	border-color: rgb(20,20,20);
}

.vw-widget-scroll-jump > a {
	margin: 0 0.25em;
	padding: 0.25em;
}

.vw-widget-scroll-jump-empty {
	border-color: #c0c0c0;
	border-radius: 1em;
}

.vw-widget-scroll-jump-empty.vw-widget-scroll-jumped {
	background: rgb(20,20,20);
}

.vw-widget-scroll-jump > img {
	max-height: 24px;
	max-width: 24px !important;
}

.vw-widget-scroll-before, .vw-widget-scroll-after {
	cursor: pointer;
	padding: 1em 0.5em;
	z-index: 5;
}

.vw-widget-scroll-before:before {
	border-right: 1px dotted rgb(20,20,20);
	content: "\f060";
}

.vw-widget-scroll-after:after {
	border-left: 1px dotted rgb(20,20,20);
	content: "\f061";
}

.vw-widget-scroll-before:before, .vw-widget-scroll-after:after {
	display: inline-block;
	font-family: FontAwesome;
	padding: 1em 0.5em;
	text-decoration: none;
	z-index: 5;
}

.vw-widget-scroll-before:hover, .vw-widget-scroll-after:hover {
	text-decoration: none;
}

.vw-widget-play-ctrl {
	left: 0.5em;
	position: absolute;
	top: 0.5em;
}

.vw-widget-play-ctrl:before {
	display: inline-block;
	font-family: FontAwesome;
	font-size: 24px;
	height: 24px;
	width: 24px;
}

.vw-widget-playing:before {
	content: "\f04c";
}

.vw-widget-paused:before {
	content: "\f04b";
}

.vw-block-sidebar > .vw-block-content > .vw-widget:first-child {
	margin-top: 0;
}

.vw-block-sidebar > .vw-block-content > .vw-widget:last-child {
	margin-bottom: 0;
}

.vw-block-sidebar > .vw-block-content > .vw-widget-multi:first-child {
	border-top: none;
}

.vw-block-sidebar > .vw-block-content > .vw-widget-multi:last-child {
	border-bottom: none;
}

.vw-block-sidebar.vw-widget {
	margin-bottom: 0;
}

.vw-blocks-feed .vw-widget-multi-scroll {
	margin-top: -3.5em;
	font-size: 0.8em;
}

.vw-blocks-feed .vw-widget .vw-block-content {
	padding-bottom: 0.5em !important;
}

.vw-sort-table .vw-sort-order {
	display: none;
}

.vw-sort-table .vw-sort-order:after {
	font-family: FontAwesome;
	padding-left: 0.5em;
}

.vw-sort-table .vw-sort-asc:after {
	content: '\f063';
}

.vw-sort-table .vw-sort-desc:after {
	content: '\f062';
}

/* --- vw_section.css --- */

/* ###### HEADLINES ###### */

/* reset */
.baseHtml h1.vw-head, .baseHtml h2.vw-head, .baseHtml h3.vw-head,
.baseHtml h4.vw-head, .baseHtml h5.vw-head, .baseHtml h6.vw-head {
	font-size: 100%;
	margin: 0;
}

.vw-head, .vw-title-box h1 {
	border-bottom: 2px solid rgb(237, 237, 237);
	color: rgb(183, 183, 183);
	font-weight: bold;
	margin-bottom: 0.1em;
	overflow: hidden;
	padding-bottom: 0.1em;
	position: relative;
	word-wrap: break-word;
}

.vw-block .vw-soft-head {
	border-bottom: none;
}

.vw-block > .vw-head:first-child, .vw-block > form > .vw-head:first-child {
	padding: 0.5em 0;
	margin: 0.5em 1em;
}

.vw-section + .vw-head, .vw-section .vw-section .vw-head {
	margin-top: 0.5em;
}

.vw-head-links {
	right: 0;
	bottom: 0.2em;
	position: absolute;
}

.vw-head-links a {
	padding-right: 0.5em;
	transition: opacity 0.3s ease 0s;
	opacity: 0.3;
}

.vw-head-links:hover a {
	opacity: 1;
}

.vw-collapse-head .vw-collapse-ctrl {
	float: right;
}

h1 .vw-head-text {
	font-size: 2.4em;
}

h2 .vw-head-text {
	font-size: 1.85em;
}

h3 .vw-head-text {
	font-size: 1.7em;
}

h4 .vw-head-text {
	font-size: 1.5em;
}

h5 .vw-head-text {
	font-size: 1.3em;
}

h6 .vw-head-text {
	font-size: 1em;
}

.vw-section {
	padding: 0.2em;
}

/* --- vw_list.css --- */

/* ###### LIST ###### */

.vw-column-list, .vw-column-list ul, .vw-column-list ol, .vw-column-list li {
	list-style-type: none !important;
	list-style-image: none !important;
	margin: 0 !important;
}

.vw-list {
	margin: 0.5em 0 1.5em;
}

.vw-list .vw-list {
	margin-bottom: 0;
}

ul.vw-list > li {
	list-style-position: inside;
	list-style-type: square !important;
	list-style-image: url(vault/resources/images/bullet.gif) !important;
	margin: 0.5em !important;
}

ol.vw-list > li {
	list-style-position: outside;
	list-style-type: decimal;
	margin: 0.5em 2.5em;
}

.vw-double-list, .vw-column-list > li {
	float: left;
	margin-right: 2%;
}

.vw-double-list, .vw-column-list-2 > li {
	width: 48%;
}

.vw-column-list-3 > li {
	width: 31%;
}

.vw-stats-views {
	margin-bottom: 0.5em;
}

.vw-list-contributors > li + li {
	padding-top: 0.5em;
}

ul.vw-list-contributors, .vw-list-contributors ul {
	margin: 0;
}

ul.vw-list-contributors > li, ul.vw-list-contributors li li {
	list-style: none;
}

.vw-contrib-list, .vw-contrib-list > li {
	display: inline;
	position: relative;
}

.vw-contrib-list > li:after {
	content: ",";
}

.vw-contrib-list > li:last-child:after {
	content: "";
}

.vw-list-item-prefix {
	background: rgb(211, 211, 211) url('styles/kanoapps-baisik/xenforo/gradients/form-button-white-25px.png') repeat-x;;
	border: 1px solid rgb(211, 211, 211);
border-radius: 6px;;
	font-size: 0.8em;
	font-weight: bold;
	padding: 0.1em 0.3em;
}

@supports (display: flex) {
	.vw-double-list, .vw-column-list {
		display: flex;
		flex-wrap: wrap;
	}
}


@media (max-width:800px)
{
	.Responsive .vw-column-list-3 > li {
		width: 100%;
		float: none;
	}
}

@media (max-width:480px)
{
	.Responsive .vw-double-list, .Responsive .vw-column-list-2 > li {
		width: 100%;
	}

	.Responsive .vw-double-list, .vw-column-list-2 > li {
		float: none;
	}
}

