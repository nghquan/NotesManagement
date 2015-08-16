angular.module('app').service('noteService', ['storage', '$q', function (storage, $q) {
    var notes = (updateFromStorage() || []);

	var uniqueId = (storage.extractItem("uniqueID") || 1);
	
    function updateFromStorage() {
        notes = storage.extractItem("notes");
        if (notes) {
            //localStorage stores date object as string
            //convert modificationDate to Date object:
            for (var i = 0; i < notes.length; i++) {
                notes[i].modificationDate = new Date(notes[i].modificationDate);
            }
        }
        return notes;
    }

    storage.onBeforePersist(
                    function handlePersist() {
                        //save notes from memory to storage
                        storage.setItem("notes", notes);
						storage.setItem("uniqueID", uniqueId);
                    }
                );

    var update = function (note) {
        var result;
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id == note.id) {
                notes[i].noteDetails = note.noteDetails;
                notes[i].modificationDate = new Date();
                result = i;
                break;
            }
        }
        return ($q.when(result));
    };

    var remove = function (note) {
        var result;
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id == note.id) {
                notes.splice(i, 1);
                result = true;
                break;
            }
        }
        return ($q.when(result));
    };

    var add = function (note) {
		var newNote = {
            id: uniqueId++,
            noteDetails: note.noteDetails,
            modificationDate: new Date()
        };
        notes.push(newNote);
        return ($q.when(newNote.id));
    };

    var updateSmallNoteDetails = function (note) {
        if (!note.noteDetails) return;
        var firstLine = note.noteDetails.split('\n')[0];
        note.more = firstLine.length < note.noteDetails.length;
        note.noteDetails = firstLine;
    }

    var getAll = function () {
        var result = angular.copy(notes);
        for (var i = 0; i < result.length; i++) {
            updateSmallNoteDetails(result[i]);
        }
        return ($q.when(result));
    };

    var getById = function (id) {
        var note;
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id == id) {
                note = notes[i];
                break;
            }
        }
        return ($q.when(note));
    };

    return {
        getAll: getAll,
        getById: getById,
        add: add,
        remove: remove,
        update: update,
    };
}]);

//angular.module('app').service('noteService', ['$http', '$q', function ($http, $q) {
//    var notes = [
//        { id: 1, noteDetails: 'ansmfna1', modificationDate: new Date() },
//        { id: 2, noteDetails: 'ansmfna2', modificationDate: new Date() },
//        { id: 3, noteDetails: 'ansmfna3', modificationDate: new Date() }
//    ];

//    var update = function (note) {
//        //for (var i = 0; i < notes.length; i++) {
//        //    if (notes[i].id == note.id) {
//        //        notes[i].noteDetails = note.noteDetails;
//        //        notes[i].modificationDate = note.modificationDate;
//        //        return true;
//        //    }
//        //}
//        //return false;
//        var request = $http({
//            method: "put",
//            url: "Note/Put",
//            params: note,
//        });
//        return (request.then(handleSuccess, handleError));
//    };

//    var remove = function (note) {
//        //for (var i = 0; i < notes.length; i++) {
//        //    if (notes[i].id == note.id) {
//        //        notes.splice(i, 1);
//        //        return true;
//        //    }
//        //}
//        //return false;
//        var request = $http({
//            method: "delete",
//            url: "Note/Delete",
//            params: { id: note.id },
//        });
//        return (request.then(handleSuccess, handleError));
//    };

//    var add = function (note) {
//        //note.modificationDate = new Date();
//        //note.id = notes.length + 1;
//        //notes.push(note);
//        var request = $http({
//            method: "post",
//            url: "Note/Post",
//            params: note,
//        });
//        return (request.then(handleSuccess, handleError));
//    };

//    var getAll = function () {
//        var request = $http({
//            method: "get",
//            url: "Note/GetAll",
//            params: {
//            }
//        });
//        return (request.then(handleSuccess, handleError));
//    };

//    var getById = function (id) {
//        var request = $http({
//            method: "get",
//            url: "Note/Get",
//            params: { id: id },
//        });
//        return (request.then(handleSuccess, handleError));
//        //for (var i = 0; i < notes.length; i++) {
//        //    if (notes[i].id == id) {
//        //        return notes[i];
//        //    }
//        //}
//        //return null;
//    };

//    return {
//        getAll: getAll,
//        getById: getById,
//        add: add,
//        remove: remove,
//        update: update,
//    };

//    function handleError(response) {
//        // The API response from the server should be returned in a
//        // nomralized format. However, if the request was not handled by the
//        // server (or what not handles properly - ex. server error), then we
//        // may have to normalize it on our end, as best we can.
//        if (
//            !angular.isObject(response.data) ||
//            !response.data.message
//            ) {
//            return ($q.reject("An unknown error occurred."));
//        }
//        // Otherwise, use expected error message.
//        return ($q.reject(response.data.message));
//    }
//    // I transform the successful response, unwrapping the application data
//    // from the API response payload.
//    function handleSuccess(response) {
//        return (response.data);
//    }
//}
//]);