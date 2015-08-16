angular.module('mockBackend', ['ngMockE2E'])
    .run(function ($httpBackend) {
        var notes = [
        { id: 1, noteDetails: 'ansmfna1', modificationDate: new Date() },
        { id: 2, noteDetails: 'ansmfna2', modificationDate: new Date() },
        { id: 3, noteDetails: 'ansmfna3', modificationDate: new Date() }
        ];

        // returns the current list of phones
        $httpBackend.whenGET('Note/GetAll').respond(function (method, url, data) {            
            return [200, notes, {}];
        });

        $httpBackend.whenGET('Note/Get?id=2').respond(function (method, url, data) {
            return [200, notes[0], {}];
        });

        // adds a new phone to the phones array
        $httpBackend.whenPOST(new RegExp('\\' + 'Note/Post')).respond(function (method, url, data) {
            var note = angular.fromJson(data);
            note.modificationDate = new Date();
            note.id = notes.length + 1;
            notes.push(note);
            return [200, note, {}];
        });
        $httpBackend.whenGET(/^\/templates\//).passThrough();
        //...
    });