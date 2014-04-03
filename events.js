/**
 *  * This method gets called by the Zimlet framework when the zimlet loads.
 *   */
zimtransfer_HandlerObject.prototype.init =
function() {
	
	// create the tab application
	this._tabAppName = this.createApp("ZimCleaner", "zimbraIcon", "ZimCleaner");

	$(document).on('click', '#inbox', function(){
		// inboxRequest();		
		$("#space_details").html(inbox_space_details);
		secondBarEffect();
	});

	$(document).on('click', '#trash', function(){
		$("#space_details").html(trash_space_details);
		secondBarEffect();
	});

	$(document).on('click', '#drafts', function(){
		$("#space_details").html(drafts_space_details);
		secondBarEffect();
	});	

	$(document).on('click', '#sent', function(){
		$("#space_details").html(sent_space_details);
		secondBarEffect();
	});

	$(document).on('click', '#spam', function(){
		$("#space_details").html(junk_space_details);
		secondBarEffect();
	});

	$(document).on('click', '#briefcase', function(){
		$("#space_details").html(briefcase_space_details);
		secondBarEffect();
	});

	$(document).on('click', '#other', function(){
		$("#space_details").html(other_space_details);
		secondBarEffect();
	});

	$(document).on('click', '#show_heaviest_btn', function(){
		var _types = new AjxVector();
		_types.add("CONV");
		appCtxt.getSearchController().search({userInitiated: true, query: 'smaller:99999MB', sortBy: 'sizeDesc', limit: 20,  offset: 0, types:_types});
	});

	$(document).on('click', '#show_oldest_btn', function(){
		var _types = new AjxVector();
		_types.add("CONV");
		var aYearAgo = getAYearAgo();
		// TODO We need a way to limit the number of results returned by the search.. a limit param doesn't work...
		appCtxt.getSearchController().search({userInitiated: true, query: 'after:01/01/1900', sortBy: 'dateAsc', types:_types});
		// var aYearAgo = today.getDate() + '/' + (today.getMonth() + 1) + '/' + (today.getFullYear() - 1);
	});

	$(document).on('click', '#show_trash_btn', function(){
		var _types = new AjxVector();
		_types.add("CONV");
		appCtxt.getSearchController().search({userInitiated: true, query: 'under:trash', sortBy: 'dateAsc', types:_types});
	});

	$(document).on('click', '#show_trash_briefcase_btn', function(){
		var _types = new AjxVector();
		_types.add("BRIEFCASE_ITEM");
		appCtxt.getSearchController().search({userInitiated: true, query: 'under:trash', sortBy: 'dateAsc', types:_types});
	});

	$(document).on('click', '#show_spam_btn', function(){
		var _types = new AjxVector();
		_types.add("CONV");
		appCtxt.getSearchController().search({userInitiated: true, query: 'under:junk', sortBy: 'dateAsc', types:_types});
	});

	$(document).on('click', '#clean_trash_btn', function(){
		var c = confirm("This will remove all the trash contents, including emails, contacts, appointments and briefcase documents. Are you sure to continue?");
		if (c)
		{
			zimtransfer_HandlerObject.prototype._submitSOAPRequestJSON('FolderAction', 'zimbraMail', {"op":"empty","id":"3","recursive":true});
		}
	});

	$(document).on('click', '#clean_spam_btn', function(){
		var c = confirm("This will remove the spam folder contents. Are you sure to continue?");
		if (c)
		{
			zimtransfer_HandlerObject.prototype._submitSOAPRequestJSON('FolderAction', 'zimbraMail', {"op":"empty","id":"4","recursive":true});
		}
	});

	$(document).on('click', '#export_heaviest_btn', function(){
		var today = new Date();
		tagName = 'heaviest-messages-' + today.toLocaleDateString() + '-' + today.getHours() + today.getMinutes() + today.getSeconds();
		console.log("tagName: " + tagName);
		// Create tag
		tagIds = heaviestIds;
		zimtransfer_HandlerObject.prototype._submitSOAPRequestJSON('CreateTag', 'zimbraMail', tagName);
	});

	$(document).on('click', '#export_oldest_btn', function(){
		var today = new Date();
		tagName = 'oldest-messages-' + today.toLocaleDateString() + '-' + today.getHours() + today.getMinutes() + today.getSeconds();
		console.log("tagName: " + tagName);
		// Create tag
		tagIds = oldestIds;
		zimtransfer_HandlerObject.prototype._submitSOAPRequestJSON('CreateTag', 'zimbraMail', tagName);
		console.log(tagIds);
	});
};