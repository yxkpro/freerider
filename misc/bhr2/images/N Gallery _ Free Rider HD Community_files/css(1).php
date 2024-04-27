@charset "UTF-8";

/* --- attachment_editor.css --- */

.AttachmentEditor
{
	clear: both;
}

.xenForm .ctrlUnit dd li.AttachedFile,
.xenForm .ctrlUnit dd .AttachmentInsertAllBlock
{
	margin-top: 0;
	margin-right: 30px;
}

.AttachmentEditor .AttachedFile,
.AttachmentEditor .AttachmentInsertAllBlock
{
	overflow: hidden; zoom: 1;
	vertical-align: middle;
	padding: 5px 10px;
}

.AttachmentEditor .AttachedFile#AttachedFileTemplate
{
	display: none;
}

	.AttachmentEditor .AttachedFile .Thumbnail
	{
		width: 54px;
		height: 54px;
		line-height: 50px;
		display: block;
		background: rgb(245, 245, 245);
		border: 1px solid rgb(237, 237, 237);
		text-align: center;
		vertical-align: middle;
		float: left;
	}
	
		.AttachmentEditor .AttachedFile .Thumbnail img
		{
			max-width: 50px;
			max-height: 50px;
			_width: 50px;
			_height: 50px;
			padding: 0;
			margin: 0;
			vertical-align: middle;
		}
		
		.AttachmentEditor .AttachedFile .Thumbnail .genericAttachment
		{			
			background: transparent url('styles/kanoapps-baisik/xenforo/node-sprite.png') no-repeat -72px 0;
display: block;
width: 36px;
height: 36px;

			
			margin: 7px;
		}

	.AttachmentEditor .AttachmentText
	{
		margin-left: 64px;
	}
	
		.AttachmentEditor .AttachedFile .Filename
		{
		}
		
		.AttachmentEditor .secondaryContent .label
		{
			margin-bottom: 2px;
			font-size: 11px;
			color: rgb(150,150,150);
		}
		
		.AttachmentEditor .secondaryContent .controls
		{
			line-height: 25px;
		}
	
		/* clearfix */ .AttachmentEditor .AttachedFile .controls { zoom: 1; } .AttachmentEditor .AttachedFile .controls:after { content: '.'; display: block; height: 0; clear: both; visibility: hidden; }
		
			
		.AttachmentEditor .AttachedFile .ProgressMeter
		{
			display: block;
			padding: 2px;
			border: 1px solid rgb(211, 211, 211);
			border-radius: 4px;
			background-color: rgb(245, 245, 245);
			margin-right: 75px;
			margin-top: 4px;
			font-size: 14pt;
			line-height: 26px;
		}
		
			.AttachmentEditor .AttachedFile .ProgressMeter .ProgressGraphic
			{
				display: inline-block;
				width: 0%;
				height: 26px;
				background: rgb(183, 183, 183) url('styles/kanoapps-baisik/xenforo/gradients/category-23px-light.png') repeat-x top;
				text-align: right;
			}
			
			.AttachmentEditor .AttachedFile .ProgressMeter .ProgressCounter
			{
				display: inline-block;
				height: 26px;
				padding: 0 10px;
			}
			
			.AttachmentEditor .AttachedFile .ProgressMeter .ProgressGraphic .ProgressCounter
			{
				color: rgb(250, 250, 250);
			}
			
			
			.AttachmentEditor .AttachedFile .AttachmentDeleter,
			.AttachmentEditor .AttachedFile .AttachmentCanceller
			{
				float: right;
				display: none;
			}

.AttachmentEditor .AttachmentInsertAllBlock
{
	display: none;
}

	.AttachmentEditor .AttachmentInsertAllBlock span
	{
		float: left;
		display: block;
		width: 54px;
		height: 34px;
		background: rgb(245, 245, 245) url('styles/kanoapps-baisik/xenforo/widgets/image-attachments.png') no-repeat center;
		border: 1px solid rgb(237, 237, 237);
		margin-right: 10px;
	}

.AttachmentEditor .AttachmentDeleteAll
{
	float: right;
}

/* SWFUploader placeholder */

.swfupload
{
	position: absolute;
	z-index: 1;
	opacity: 0;
}

/* Uploader JS Overlay */

.xenOverlay.attachmentUploader
{
	max-width: 500px;
}

.attachmentUploader #ctrl_upload
{
	margin: 2px auto 5px;
}

.attachmentUploader .attachmentConstraints dl
{
	margin-top: 2px;
	font-size: 11px;
}

/* --- back_to_top.css --- */



#top-link {
        display:none;
        position: fixed;
        bottom: 60px;
        right: 30px;
        cursor: pointer;
        outline: none;
        padding: 3px 5px;
        font-size: 1em;
        font-family: 'Trebuchet MS', Helvetica, Arial, sans-serif;
        text-decoration: none;
        background: #23292e; opacity: 0.75;
        color: #c7d5dc !important;
        z-index:1;
        box-shadow: 2px 2px 5px #888;
        border-radius: 2px;
}

/* In responsive, use standard placement for button */

@media (max-width:610px) {
#top-link {
        bottom: 10px;
        right: 10px;
        }
}


/* close off @media */


/* --- bb_code.css --- */

/* .bbCodeX classes are designed to exist inside .baseHtml. ie: they have no CSS reset applied */

.bbCodeBlock
{
	margin: 1em 150px 1em 0;
border: 1px solid rgb(211, 211, 211);
border-radius: 4px;
box-shadow: rgba(0,0,0,0.04) 0px 1px 6px;

}

	.bbCodeBlock .bbCodeBlock,
	.hasJs .bbCodeBlock .bbCodeSpoilerText,
	.messageList.withSidebar .bbCodeBlock
	{
		margin-right: 0;
	}

	/* mini CSS reset */
	.bbCodeBlock pre,
	.bbCodeBlock blockquote
	{
		margin: 0;
	}
	
	.bbCodeBlock img
	{
		border: none;
	}

.bbCodeBlock .type
{
	font-size: 11px;
font-family: Tahoma, Helvetica, Arial, sans-serif;
color: rgb(183, 183, 183);
background: rgb(237, 237, 237) url('styles/kanoapps-baisik/xenforo/gradients/form-button-white-25px.png') repeat-x top;
padding: 3px 8px;
border-bottom: 1px solid rgb(211, 211, 211);
border-top-left-radius: 3px;
border-top-right-radius: 3px;

}

.bbCodeBlock pre,
.bbCodeBlock .code
{
	font-size: 10pt;
font-family: Consolas, 'Courier New', Courier, monospace;
background-color: rgb(250, 250, 250);
padding: 10px;
border-radius: 4px;
word-wrap: normal;
overflow: auto;
line-height: 1.24;
min-height: 30px;
max-height: 500px;
_width: 600px;
direction: ltr;

}

.bbCodeBlock .code
{
	white-space: nowrap;
}

.bbCodeQuote
{
	border-color: rgb(222, 222, 222);
overflow: auto;

}

.bbCodeQuote .attribution
{
	color: rgb(20,20,20);
background: rgb(222, 222, 222) url('styles/kanoapps-baisik/xenforo/gradients/form-button-white-25px.png') repeat-x top;
border-bottom: 1px solid rgb(222, 222, 222);
background-image: -moz-linear-gradient(top, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.2) 100%);
background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0.45)), color-stop(100%,rgba(255,255,255,0.2)));
background-image: -webkit-linear-gradient(top, rgba(255,255,255,0.45) 0%,rgba(255,255,255,0.2) 100%);
background-image: -o-linear-gradient(top, rgba(255,255,255,0.45) 0%,rgba(255,255,255,0.2) 100%);
background-image: -ms-linear-gradient(top, rgba(255,255,255,0.45) 0%,rgba(255,255,255,0.2) 100%);
background-image: linear-gradient(to bottom, rgba(255,255,255,0.45) 0%,rgba(255,255,255,0.2) 100%);

}

.bbCodeQuote .quoteContainer
{
	overflow: hidden;
	position: relative;
	
	font-size: 9pt;
background-color: rgb(245, 245, 245);
background-repeat: repeat-x;
background-position: top;
padding: 10px;
border-radius: 4px;

}

.bbCodeDetails > summary::after {
	content: " (open)"
}

.bbCodeDetails[open] > summary::after {
	content: " (close)"
}

.bbCodeDetails > summary:empty::after {
	content: "Show spoiler"
}

.bbCodeDetails[open] > summary:empty::after {
	content: "Hide spoiler"
}

.bbCodePanel, .bbCodeScrollingBox {
	background-color: rgb(255,255,255);
	border: 1px solid rgb(36, 36, 36);
	color: rgb(0,0,0);
	padding: 0.25em 0.5em;
}

.bbCodeScrollingBox {
	overflow: auto;
	width: auto;
}


	.bbCodeQuote .quoteContainer .quote
	{
		max-height: 150px;
		overflow: hidden;
		padding-bottom: 1px;
	}
	
		.NoJs .bbCodeQuote .quoteContainer .quote
		{
			max-height: none;
		}

	.bbCodeQuote .quoteContainer .quoteExpand
	{		
		display: none;
		box-sizing: border-box;
		position: absolute;
		height: 80px;
		top: 90px;
		left: 0;
		right: 0;
		
		font-size: 11px;
		line-height: 1;
		text-align: center;
		color: rgb(195, 195, 195);
		cursor: pointer;
		padding-top: 65px;
		background: -webkit-linear-gradient(top, rgba(245, 245, 245, 0) 0%, rgb(245, 245, 245) 80%);
		background: -moz-linear-gradient(top, rgba(245, 245, 245, 0) 0%, rgb(245, 245, 245) 80%);
		background: -o-linear-gradient(top, rgba(245, 245, 245, 0) 0%, rgb(245, 245, 245) 80%);
		background: linear-gradient(to bottom, rgba(245, 245, 245, 0) 0%, rgb(245, 245, 245) 80%);
		
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}
	
	.bbCodeQuote .quoteContainer .quoteExpand.quoteCut
	{
		display: block;
	}
	
	.bbCodeQuote .quoteContainer.expanded .quote
	{
		max-height: none;
	}
	
	.bbCodeQuote .quoteContainer.expanded .quoteExpand
	{
		display: none;
	}


	.bbCodeQuote img
	{
		max-height: 150px;
	}
	
	.bbCodeQuote iframe,
	.bbCodeQuote .fb_iframe_widget,
	.bbCodeQuote object,
	.bbCodeQuote embed
	{
		max-width: 200px;
		max-height: 150px;
	}
	
	.bbCodeQuote iframe:-webkit-full-screen
	{
		max-width: none;
		max-height: none;
	}
	
	.bbCodeQuote iframe:-moz-full-screen
	{
		max-width: none;
		max-height: none;
	}
	
	.bbCodeQuote iframe:-ms-fullscreen
	{
		max-width: none;
		max-height: none;
	}
	
	.bbCodeQuote iframe:fullscreen
	{
		max-width: none;
		max-height: none;
	}
	
.bbCodeSpoilerButton
{
	margin: 5px 0;
	max-width: 99%;
}

	.bbCodeSpoilerButton > span
	{
		display: inline-block;
		max-width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
.hasJs .bbCodeSpoilerText
{
	display: none;
	background-color: rgb(250, 250, 250);
padding: 5px;
margin-top: 5px;
margin-right: 150px;
margin-bottom: 5px;
border: 1px solid rgb(237, 237, 237);
border-radius: 5px;
overflow: auto;

}

	.hasJs .bbCodeSpoilerText .bbCodeSpoilerText,
	.hasJs .bbCodeSpoilerText .bbCodeBlock,
	.hasJs .messageList.withSidebar .bbCodeSpoilerText
	{
		margin-right: 0;
	}
	
.NoJs .bbCodeSpoilerContainer
{
	background-color: rgb(20,20,20); /* fallback for browsers without currentColor */
	background-color: currentColor;
}

	.NoJs .bbCodeSpoilerContainer > .bbCodeSpoilerText
	{
		visibility: hidden;
	}

	.NoJs .bbCodeSpoilerContainer:hover
	{
		background-color: transparent;
	}
	
		.NoJs .bbCodeSpoilerContainer:hover > .bbCodeSpoilerText
		{
			visibility: visible;
		}


@media (max-width:800px)
{
	.Responsive .bbCodeBlock,
	.Responsive.hasJs .bbCodeSpoilerText
	{
		margin-right: 0;
	}
}


/* --- bbcm_js.css --- */

.bbcmSpoilerBlock .bbcm_spoil_noscript_desc
{
	font-style:italic;
	font-size:7pt;
}

.bbcmSpoilerBlock .bbcm_spoiler,
.bbcmSpoilerBlock .button
{
	display: none;
}
 
.bbcmSpoilerBlock .bbcm_spoiler_noscript
{
	color:rgb(245, 245, 245);
	cursor: pointer;
}

.bbcmSpoilerBlock .bbcm_spoiler_noscript:hover
{
	color:rgb(20,20,20);
}

/* --- inline_mod.css --- */

/* Inline Moderation Floater */

.sectionFooter #InlineModControls
{
	float: right;
}

.hasJs #InlineModControls,
.hasJs .InlineMod.Hide
{
	display:none;
}
	
	.sectionFooter #InlineModControls .selectionControl
	{
		display: none;
	}
	
	.sectionFooter #InlineModControls .InlineModCheckedTotal
	{
		font-weight: bold;
	}
	
	.sectionFooter .SelectionCount
	{
		float: right;
	}

/* inline mod overlay */

#InlineModOverlay
{
	display: none;
	z-index: 10000;
	border: 1px solid rgb(183, 183, 183);
	box-shadow: 0px 25px 50px rgba(0,0,0, 0.5);
	max-width: 460px;
	width: 99%;
}

.Touch #InlineModOverlay
{
	box-shadow: none;
}

#InlineModOverlay .selectionControl
{
	display: block;
	overflow: hidden; zoom: 1;
	font-size: 11px;
	padding: 5px 10px;
	line-height: 23px;
}

	#InlineModOverlay .selectionControl .button
	{
		font-size: 9px;
	}
	
		#InlineModOverlay .SelectionCount
		{
			margin-left: 10px;
		}
	
		#InlineModOverlay .SelectionCount:hover
		{
			text-decoration: none;
		}
	
			#InlineModOverlay .SelectionCount .InlineModCheckedTotal
			{
				font-weight: bold;
			}
	
	#InlineModOverlay label
	{
		float: right;
	}

#InlineModOverlay .actionControl
{
	overflow: hidden; zoom: 1;
	display: block;
	padding: 2px 10px;
}

	#InlineModOverlay .actionControl .commonActions
	{
		float: left;
	}
	
	#InlineModOverlay .actionControl .otherActions
	{
		float: right;
	}

		#InlineModOverlay #ModerationSelect
		{
			width: 180px;
		}
		
/* inline moderation checkbox */

.inlineModCheckTip .arrow
{
	/*position: absolute;
	top: auto;
	left: 8px;
	bottom: -6px;
	
	border-top:  6px solid rgb(0,0,0); border-top:  6px solid rgba(0,0,0, 0.6); _border-top:  6px solid rgb(0,0,0);	
	border-right: 6px solid transparent;
	border-bottom: none;
	border-left: 6px solid transparent;*/
}

/* inline control group */

.inlineCtrlGroup
{
	background: rgb(150,150,150) url('styles/kanoapps-baisik/xenforo/gradients/thread-modctrls-30px-dark.png') repeat-x top;
	color: white;
	font-size: 11px;
}

	.inlineCtrlGroup .textCtrl
	{
		padding: 3px;
		background-color: #555;
		color: #eee;
		border: 1px solid #999;
		border-radius: 5px;
		font-size: 11px;
	}
	
		.inlineCtrlGroup .textCtrl:focus,
		.inlineCtrlGroup .textCtrl.Focus
		{
			background: #333;
			color: white;
		}
	
/* selection count thingies */

.SelectionCount .InlineModCheckedTotal
{
	font-weight: bold;
}

.SelectionCount.cloned.itemsChecked
{
	color: red;
}

/* InlineMod Generic Selected Items */

.InlineModChecked .section,
.InlineModChecked .sectionMain,
.InlineModChecked .primaryContent,
.InlineModChecked .secondaryContent,
.InlineModChecked .sectionFooter
{
	background: rgb(255,255,200) url('styles/kanoapps-baisik/xenforo/gradients/category-23px-light.png') repeat-x top;

}


@media (max-width:480px)
{
	.Responsive #InlineModOverlay .commonActions,
	.Responsive #InlineModOverlay .otherActions
	{
		float: none;
		display: block;
	}
}


/* --- likes_summary.css --- */

.likesSummary
{
	overflow: hidden; zoom: 1;
	font-size: 11px;
}

	.LikeText
	{
		float: left;
	}
	
	.likeInfo
	{
		float: right;
	}

/* --- message.css --- */



.messageList
{
	background-color: rgb(231,231,231);
padding: 8px;
border: 1px solid rgb(211, 211, 211);
box-shadow: rgba(0,0,0,0.08) 0px 1px 6px;

}

.messageList .message
{
	padding: 40px 10px;
border-bottom: 1px solid rgb(223, 223, 223);

}

/* clearfix */ .messageList .message { zoom: 1; } .messageList .message:after { content: '.'; display: block; height: 0; clear: both; visibility: hidden; }

/*** Message block ***/

.message .messageInfo
{
	padding: 0;
margin-left: 150px;
border-bottom: 1px none black;

	zoom: 1;
}

	.message .newIndicator
	{
		font-size: 11px;
color: rgb(101, 101, 101);
background: rgb(183, 183, 183) url('styles/kanoapps-baisik/xenforo/gradients/form-button-white-25px.png') repeat-x top;
padding: 1px 5px;
margin: -5px -5px 5px 5px;
border: 1px solid rgb(183, 183, 183);
border-radius: 3px;
border-top-right-radius: 0px;
display: block;
float: right;
position: relative;
box-shadow: 1px 1px 3px rgba(0,0,0, 0.25);

		
		margin-right: -17px;
	}
	
		.message .newIndicator span
		{
			background-color: rgb(183, 183, 183);
border-top-right-radius: 3px;
position: absolute;
top: -4px;
right: -1px;
width: 5px;
height: 4px;

		}

	.message .messageContent
	{
		padding-bottom: 2px;
min-height: 100px;
overflow: hidden;
*zoom: 1;

	}
	
	.message .messageTextEndMarker
	{
		height: 0;
		font-size: 0;
		overflow: hidden;
	}
	
	.message .editDate
	{
		text-align: right;
		margin-top: 5px;
		font-size: 11px;
		color: rgb(150,150,150);
	}

	.message .signature
	{
		font-size: 9pt;
color: rgb(150,150,150);
padding: 5px 0 0;
margin-top: 5px;
border-top: 1px dashed rgb(211, 211, 211);

	}

	.message .messageMeta
	{
		font-size: 11px;
padding: 20px 5px 10px;
margin: -5px;
overflow: hidden;
zoom: 1;

	}

		.message .privateControls
		{
			float: left;

		}

		.message .publicControls
		{
			float: right;

		}
		
			.message .privateControls .item
			{
				margin-right: 10px;
				float: left;
			}

				.message .privateControls .item:last-child
				{
					margin-right: 0;
				}

			.message .publicControls .item
			{
				margin-left: 10px;
				float: left;
			}
	
				.message .messageMeta .control
				{
					color: rgb(112, 112, 112);
text-decoration: none;
background-color: rgb(244, 244, 244);
padding: 5px 8px;
margin-top: -6px;
margin-right: 5px;
margin-bottom: -6px;
border: 1px solid rgb(209, 209, 209);
border-radius: 3px;
box-shadow: rgba(0,0,0,0.05) 0px 1px 3px;
text-shadow: rgba(255,255,255,1) 0px 1px 0px;
background-image: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(100%,rgba(255,255,255,0)));
background-image: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
background-image: -o-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
background-image: -ms-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
background-image: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);

				}
				
					.message .messageMeta .control:focus
					{
						
					}
				
					.message .messageMeta .control:hover
					{
						color: rgb(65, 65, 65);
background-color: rgb(250, 250, 250);
border-color: rgb(195, 195, 195);

					}
				
					.message .messageMeta .control:active
					{
						position: relative;
top: 1px;
box-shadow: inset rgba(0,0,0,0.1) 0px 1px 3px;
background-image: -moz-linear-gradient(top, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 100%);
background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.06)), color-stop(100%,rgba(0,0,0,0.03)));
background-image: -webkit-linear-gradient(top, rgba(0,0,0,0.06) 0%,rgba(0,0,0,0.03) 100%);
background-image: -o-linear-gradient(top, rgba(0,0,0,0.06) 0%,rgba(0,0,0,0.03) 100%);
background-image: -ms-linear-gradient(top, rgba(0,0,0,0.06) 0%,rgba(0,0,0,0.03) 100%);
background-image: linear-gradient(to bottom, rgba(0,0,0,0.06) 0%,rgba(0,0,0,0.03) 100%);

					}
	/*** multiquote +/- ***/
			
	.message .publicControls .MultiQuoteControl
	{
		padding-left: 4px;
		padding-right: 4px;
		border-radius: 2px;
		margin-left: 6px;
		margin-right: -4px;
	}
	
	
	.message .publicControls .MultiQuoteControl.active
	{
		background-color: rgb(237, 237, 237);
	}
	
		.messageNotices li
	{
		font-size: 11px;
background: rgb(222, 222, 222) url('styles/kanoapps-baisik/xenforo/gradients/form-button-white-25px.png') repeat-x top;
padding: 5px;
margin: 10px 0;
border: 1px solid rgb(222, 222, 222);
border-radius: 5px;
line-height: 16px;

	}
	
		.messageNotices .icon
		{
			float: right;
			width: 16px;
			height: 16px;
			background: url('styles/kanoapps-baisik/xenforo/xenforo-ui-sprite.png') no-repeat 1000px 1000px;
		}
	
			.messageNotices .warningNotice .icon { background-position: -48px -32px; }		
			.messageNotices .deletedNotice .icon { background-position: -64px -32px; }		
			.messageNotices .moderatedNotice .icon {background-position: -32px -16px; }
	
	.message .likesSummary
	{
		padding: 5px;
margin-top: 10px;
border: 1px solid rgb(237, 237, 237);
border-radius: 5px;

	}
	
	.message .messageText > *:first-child
	{
		margin-top: 0;
	}

/* inline moderation changes */

.InlineModChecked .messageUserBlock,
.InlineModChecked .messageInfo,
.InlineModChecked .messageNotices,
.InlineModChecked .bbCodeBlock .type,
.InlineModChecked .bbCodeBlock blockquote,
.InlineModChecked .attachedFiles .attachedFilesHeader,
.InlineModChecked .attachedFiles .attachmentList
{
	background: rgb(255,255,200) url('styles/kanoapps-baisik/xenforo/gradients/category-23px-light.png') repeat-x top;

}

.InlineModChecked .messageUserBlock div.avatarHolder,
.InlineModChecked .messageUserBlock .extraUserInfo
{
	background: transparent;
}

.InlineModChecked .messageUserBlock .arrow span
{
	border-left-color: rgb(255,255,200);
}

/* message list */

.messageList .newMessagesNotice
{
	margin: 10px auto;
	padding: 5px 10px;
	border-radius: 5px;
	border: 1px solid rgb(211, 211, 211);
	background: rgb(237, 237, 237) url(styles/kanoapps-baisik/xenforo/gradients/category-23px-light.png) repeat-x top;
	font-size: 11px;
}

/* deleted / ignored message placeholder */

.messageList .message.placeholder
{
}

.messageList .placeholder .placeholderContent
{	
	overflow: hidden; zoom: 1;
	color: rgb(155, 155, 155);
	font-size: 11px;
}

	.messageList .placeholder a.avatar
	{
		float: left;
		display: block;
	}
	
		.messageList .placeholder a.avatar img
		{
			display: block;
			width: 32px;
			height: 32px;
		}
		
	.messageList .placeholder .privateControls
	{
		margin-top: -5px;
	}
	

/* messages remaining link */

.postsRemaining a,
a.postsRemaining
{
	font-size: 11px;
	color: rgb(150,150,150);
}


@media (max-width:800px)
{
	.Responsive .message .newIndicator
	{
		margin-right: 0;
		border-top-right-radius: 3px;
	}
	
		.Responsive .message .newIndicator span
		{
			display: none;
		}
}

@media (max-width:480px)
{
	.Responsive .message .messageInfo
	{
		margin-left: 0;
		padding: 0 10px;
	}

	.Responsive .message .messageContent
	{
		min-height: 0;
	}	

	.Responsive .message .newIndicator
	{
		margin-right: -5px;
		margin-top: -16px;
	}

	.Responsive .message .postNumber,
	.Responsive .message .authorEnd
	{
		display: none;
	}
	
	.Responsive .message .signature
	{
		display: none;
	}
	
	.Responsive .messageList .placeholder a.avatar
	{
		margin-right: 10px;
	}
}


/* --- message_user_info.css --- */

.messageUserInfo
{
	float: left;
width: 124px;

}

	.messageUserBlock
	{
		background: rgb(250, 250, 250) url('styles/kanoapps-baisik/xenforo/gradients/tab-selected-light.png') repeat-x bottom;
border: 1px solid rgb(211, 211, 211);
border-radius: 3px;

		
		position: relative;
	}
		
		.messageUserBlock div.avatarHolder
		{
			background-color: rgb(237, 237, 237);
padding: 10px;
border-radius: 4px;
	
		}
		
			.messageUserBlock div.avatarHolder .avatar
			{
				display: block;
				font-size: 0;
			}
			
		.messageUserBlock h3.userText
		{
			font-size: 13px;
padding: 20px 0px 8px 8px;

		}
		
		.message.quickReply .frhd_link {
			display:none
		}
		
		.messageUserBlock .userBanner
		{
			display: block;
			margin-bottom: 5px;
			margin-left: -14px;
			margin-right: -6px;
		}
		
		.messageUserBlock .userBanner:last-child
		{
			margin-bottom: 0;
		}
	
		.messageUserBlock a.username
		{
			font-weight: bold;
display: block;
overflow: hidden;
line-height: 20px;

			
		}
		
		.messageUserBlock .userTitle
		{
			font-size: 11px;
display: block;

		}
		
		.messageUserBlock .extraUserInfo
		{
			font-size: 10px;
background-color: rgb(250, 250, 250);
padding: 4px 6px;
border-radius: 4px;

		}
		
			.messageUserBlock .extraUserInfo dl
			{
				margin: 2px 0 0;
			}
							
			.messageUserBlock .extraUserInfo img
			{
				max-width: 100%;
			}
		
		.messageUserBlock .arrow
		{
			position: absolute;
			top: 10px;
			right: -10px;
			
			display: block;
			width: 0px;
			height: 0px;
			line-height: 0px;
			
			border: 10px solid transparent;
			border-left-color: rgb(211, 211, 211);
			-moz-border-left-colors: rgb(211, 211, 211);
			border-right: none;
			
			/* Hide from IE6 */
			_display: none;
		}
		
			.messageUserBlock .arrow span
			{
				position: absolute;
				top: -10px;
				left: -11px;
				
				display: block;
				width: 0px;
				height: 0px;
				line-height: 0px;
				
				border: 10px solid transparent;
				border-left-color: rgb(237, 237, 237);
				-moz-border-left-colors: rgb(237, 237, 237);
				border-right: none;
			}


@media (max-width:480px)
{
	.Responsive .messageUserInfo
	{
		float: none;
		width: auto; 
	}

	.Responsive .messageUserBlock
	{
		overflow: hidden;
		margin-bottom: 5px;
		position: relative;
	}

	.Responsive .messageUserBlock div.avatarHolder
	{
		float: left;
		padding: 5px;
	}

		.Responsive .messageUserBlock div.avatarHolder .avatar img
		{
			width: 48px;
			height: 48px;
		}

	.Responsive .messageUserBlock h3.userText
	{
		margin-left: 64px;
	}
	
	.Responsive .messageUserBlock .userBanner
	{
		max-width: 150px;
		margin-left: 0;
		margin-right: 0;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
		position: static;
		display: inline-block;
	}
	
		.Responsive .messageUserBlock .userBanner span
		{
			display: none;
		}

	.Responsive .messageUserBlock .extraUserInfo
	{
		display: none;
	}

	.Responsive .messageUserBlock .arrow
	{
		display: none;
	}
}


/* --- moderator_bar.css --- */

#moderatorBar
{
	background-color: rgb(36, 36, 36);
	border-bottom: 1px solid rgb(155, 155, 155);	
	font-size: 11px;
}

/*#moderatorBar
{
	box-shadow: 0 0 5px rgb(101, 101, 101);
	width: 100%;
	position: fixed;
	top: 0px;
	z-index: 100;
}

body
{
	padding-top: 25px;
}*/

/* clearfix */ #moderatorBar { zoom: 1; } #moderatorBar:after { content: '.'; display: block; height: 0; clear: both; visibility: hidden; }

#moderatorBar .pageContent
{
	padding: 2px 0;
	overflow: auto;
}

#moderatorBar a
{
	display: inline-block;
	padding: 2px 10px;
	border-radius: 3px;
}

#moderatorBar a,
#moderatorBar .itemCount
{
	color: rgb(211, 211, 211);
}

	#moderatorBar a:hover
	{
		text-decoration: none;
		background-color: rgb(67, 67, 67);
		color: rgb(237, 237, 237);
	}

/* TODO: maybe sort out the vertical alignment of the counters so they they are properly centered */

#moderatorBar .itemLabel,
#moderatorBar .itemCount
{
	display: inline-block;
	height: 16px;
	line-height: 16px;
}

#moderatorBar .itemCount
{	
	background: rgb(67, 67, 67);
	padding-left: 6px;
	padding-right: 6px;
	
	text-align: center;
	
	font-weight: bold;
	
	border-radius: 2px;
	text-shadow: none;
}

	#moderatorBar .itemCount.alert
	{
		background: #e03030;
		color: white;
		box-shadow: 2px 2px 5px rgba(0,0,0, 0.25);
	}
	
#moderatorBar .adminLink
{
	float: right;
}

#moderatorBar .permissionTest,
#moderatorBar .permissionTest:hover
{
	background: #e03030;
	color: white;
	box-shadow: 2px 2px 5px rgba(0,0,0, 0.25);
	font-weight: bold;
}

/* --- nat_public_css.css --- */

.natMenuLevel0
{
	padding-left: 0px;
}

.natMenuLevel1
{
	padding-left: 10px;
}

.natMenuLevel2
{
	padding-left: 20px;
}

.natMenuLevel3
{
	padding-left: 30px;
}

.natMenuLevel4
{
	padding-left: 40px;
}

.natMenuLevel5
{
	padding-left: 50px;
}

.natMenuLevel6
{
	padding-left: 60px;
}

.natMenuLevel7
{
	padding-left: 70px;
}

.natMenuLevel8
{
	padding-left: 80px;
}

.natMenuLevel9
{
	padding-left: 90px;
}

.natMenuLevel10
{
	padding-left: 100px;
}



/* STYLING TO MAKE COLUMN MENUS WORK */
div.natJSMenuColumns
{
	background: rgb(250, 250, 250) url('styles/kanoapps-baisik/xenforo/gradients/category-23px-light.png') repeat-x top;
	background-color: rgba(250, 250, 250, 0.96);
}

/* STYLING TO MAKE COLUMN MENUS WORK */
div.natJSMenuColumns ul
{
	float: left;
	border-bottom: 0px;
	background-color: transparent !important;
	max-height: none !important;
}







/* --- quick_reply.css --- */

/*quick reply*/

.quickReply
{	
	padding: 40px 10px;
border-bottom: 1px solid rgb(223, 223, 223);

}

/* clearfix */ .quickReply { zoom: 1; } .quickReply:after { content: '.'; display: block; height: 0; clear: both; visibility: hidden; }

.quickReply .replyPrompt em
{
	font-style: italic;
}

/* the quick reply form */

#QuickReply
{
	padding: 0;
margin-left: 150px;
border-bottom: 1px none black;

}

#QuickReply textarea
{
	width: 100%;
	*width: 98%;
	height: 100px;
	box-sizing: border-box;
}

#QuickReply .insertQuotes
{
	display: none;
	float: left;
	
	margin-top: 0px;
}

#QuickReply .submitUnit
{
	margin-top: 5px;
	text-align: right;
	line-height: 31px;
	position: relative;
	z-index: 1;
}

	#QuickReply .submitUnit .draftUpdate
	{
		position: absolute;
		left: 0;
		z-index: -1;
		color: rgb(150,150,150);
		font-size: 11px;
	}
	
		#QuickReply .submitUnit .draftUpdate span
		{
			display: none;
		}

#QuickReply .AttachmentEditor
{
	padding-top: 10px;
}

/** Selected quote tooltip **/

#QuoteSelected
{
}

	#QuoteSelected .arrow
	{
		top: -6px;
		bottom: auto;
		border-top: 1px none black;
		border-bottom:  6px solid rgb(0,0,0); border-bottom:  6px solid rgba(0,0,0, 0.6); _border-bottom:  6px solid rgb(0,0,0);
	}
	
	#QuoteSelected a
	{
		text-decoration: none;
	}
	
	#QuoteSelected a:hover
	{
		text-decoration: underline;
	}


@media (max-width:610px)
{
	.Responsive #QuickReply .insertQuotes
	{
		float: right;
		margin-left: 3px;
	}
}
@media (max-width:480px)
{
	.Responsive .quickReply .messageUserInfo
	{
		display: none;
	}

	.Responsive #QuickReply
	{
		margin-left: 0;
	}
}


/* --- share_page.css --- */

.sharePage
{
}

/* clearfix */ .sharePage { zoom: 1; } .sharePage:after { content: '.'; display: block; height: 0; clear: both; visibility: hidden; }

	.sharePage .shareControl
	{
		float: left;
	}
	
	.sharePage .tweet
	{
		margin-right: 30px;
	}

	.sharePage .facebookLike .label
	{
		font-size: 11px;
		line-height: 24px;
		float: left;
		margin-right: 7px;
		display: none;
	}
	
	.sharePage iframe
	{
		height: 20px;
	}
	
	.sharePage .facebookLike iframe
	{
		z-index: 52;
	}
	



@media (max-width:480px)
{
	.Responsive .sharePage
	{
		display: none;
	}
}


/* --- thread_view.css --- */

.thread_view .threadAlerts
{
	border: 1px solid rgb(237, 237, 237);
	border-radius: 5px;
	font-size: 11px;
	margin: 10px 0;
	padding: 5px;
	line-height: 16px;
	background-image: url('styles/kanoapps-baisik/xenforo/gradients/form-button-white-25px.png');
}
	
	.thread_view .threadAlerts dt
	{
		color: rgb(183, 183, 183);
		display: inline;
	}
	
	.thread_view .threadAlerts dd
	{
		color: rgb(67, 67, 67);
		font-weight: bold;
		display: inline;
	}
	
		.thread_view .threadAlerts .icon
		{
			float: right;
			width: 16px;
			height: 16px;
			margin-left: 5px;
			background: url('styles/kanoapps-baisik/xenforo/xenforo-ui-sprite.png') no-repeat -1000px -1000px;
		}
		
			.thread_view .threadAlerts .deletedAlert .icon { background-position: -64px -32px; }
			.thread_view .threadAlerts .moderatedAlert .icon { background-position: -32px -16px; }
			.thread_view .threadAlerts .lockedAlert .icon { background-position: -16px -16px; }
	
.thread_view .threadAlerts + * > .messageList
{
	border-top: none;
}

.thread_view .threadNotices
{
	background-color: rgb(250, 250, 250);
	border: 1px solid rgb(211, 211, 211);
	border-radius: 5px;
	padding: 10px;
	margin: 10px auto;
}

.thread_view .InlineMod
{
	overflow: hidden; zoom: 1;
}
