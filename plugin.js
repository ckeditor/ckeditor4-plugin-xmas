/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
'use strict';

( function() {

	var CARD_HEIGHT = 404,
		CARD_WIDTH = 316;

	CKEDITOR.plugins.add( 'xmas', {
		requires: 'dialog',
		icons: 'xmas', // %REMOVE_LINE_CORE%
		hidpi: true, // %REMOVE_LINE_CORE%
		lang: 'en', // %REMOVE_LINE_CORE%
		init: function( editor ) {
			var command = editor.addCommand( 'xmas', new CKEDITOR.command( editor, {
				exec: function( editor ) {
					show( editor );
			    }
			} ) );

			command.modes = { wysiwyg: 1, source: 1 };
			command.canUndo = false;
			command.readOnly = 1;

			editor.ui.addButton && editor.ui.addButton( 'Xmas', {
				label: editor.lang.xmas.title,
				command: 'xmas',
				toolbar: 'about',
				icon: 'xmas'
			} );
		}
	} );

	function show( editor ) {
		var win = CKEDITOR.document.getWindow();
		var config = editor.config,
			backgroundColorStyle = config.dialog_backgroundCoverColor || 'white',
			backgroundCoverOpacity = config.dialog_backgroundCoverOpacity,
			baseFloatZIndex = config.baseFloatZIndex,

			coverHtml =
				'<div tabIndex="-1" style="position:fixed;' +
					'z-index: ' + baseFloatZIndex + ';' +
					'top: 0px;' +
					'left: 0px; ' +
					'width: 100%;' +
					'height: 100%;' +
					'background-color: ' + backgroundColorStyle + '"' +
				'class="cke_xmas_background_cover">' +
				'</div>',
			cardHtml =
				'<div tabIndex="-1" style="position:fixed;' +
					'z-index: ' + baseFloatZIndex + 1 + ';' +
					'top: ' + getTopHeight() + 'px;' +
					'left: 50%; ' +
					'margin-left: -' + ( CARD_WIDTH / 2 ) + 'px; ' +
					'width: ' + CARD_WIDTH + 'px;' +
					'height: ' + CARD_HEIGHT + 'px;' +
					'pointer-events: none;' +
					'background: url(\'' + CKEDITOR.plugins.get( 'xmas' ).path + 'images/xmas-background.jpg' + '\');' +
					'"' +
				'class="cke_xmas_card">' +
					'<div style="padding:30px;">' +
						'<p>Merry Christmas<img src="' + CKEDITOR.plugins.get( 'xmas' ).path + 'images/ckeditor-logo.png">!</p>' +
					'</div>' +
				'</div>';

		var coverElement = CKEDITOR.dom.element.createFromHtml( coverHtml ),
			cardElement = CKEDITOR.dom.element.createFromHtml( cardHtml );

		coverElement.$.onclick = function() {
			coverElement.remove();
			cardElement.remove();
		}

		cardElement.$.onclick = function() {
			coverElement.remove();
			cardElement.remove();
		}

		win.on( 'resize', function() {
			cardElement.setStyles( {
				top: getTopHeight() + 'px'
			} );
		} );


		coverElement.setOpacity( backgroundCoverOpacity != undefined ? backgroundCoverOpacity : 0.5 );

		coverElement.appendTo( CKEDITOR.document.getBody() );
		cardElement.appendTo( CKEDITOR.document.getBody() );

		// Makes the dialog cover a focus holder as well.
		editor.focusManager.add( coverElement );
	}

	function getTopHeight() {
		var win = CKEDITOR.document.getWindow(),
			size = win.getViewPaneSize();

		return Math.max( 0, Math.round( ( size.height - CARD_HEIGHT ) / 2 ) );
	}
} )();
