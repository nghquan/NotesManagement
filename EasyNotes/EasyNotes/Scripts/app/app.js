var app = angular
    .module('app', []);

app.controller('homeCtrl', ['$scope', '$http', 'noteService', function ($scope, $http, noteService) {
    $scope.notes = {
        items: [],
        selectedItem: null,
        selectionChange: function (item) {
            this.selectedItem = item;
            noteService.getById(item.id)
                        .then(
                            function (result) {
                                $scope.note.set(result);
                            }
                        );
        },
        refresh: function () {
            var parent = this;
            this.selectedItem = null;
            noteService.getAll()
                        .then(
                            function (result) {
                                parent.items = result;
                            }
                        );
        },
        predicate: 'modificationDate',
        reverse: true,
        order: function (predicate) {
            this.reverse = (this.predicate === predicate) ? !this.reverse : false;
            this.predicate = predicate;
        },
        searchText: null,
    };

    $scope.note = {
        id: null,
        noteDetails: null,
        modificationDate: null,
        set: function (item) {
            this.noteDetails = item.noteDetails;
            this.modificationDate = item.modificationDate;
            this.id = item.id;
        },
        submit: function () {
            if ($scope.noteForm.$valid) {
                var parent = this;
                if (!this.id) {
                    noteService.add(this)
                               .then(function (result) {
                                   refresh();
                               }
                            );
                } else {
                    noteService.update(this)
                               .then(function (result) {
                                   refresh();
                               }
                            );
                }
            }
        },
        delete: function () {
            var parent = this;
            noteService.remove(this)
                        .then(function (result) {
                            refresh()
                        });
        }
    };

    $scope.cancel = function () {
        refresh();
    };

    init();

    function refresh() {
        $scope.notes.refresh();
        $scope.note.set({});
        if ($scope.noteForm) {
            $scope.noteForm.$setPristine();
        }
    }

    function init() {
        refresh();
    }

}]);

app.filter('highlight', function ($sce) {
    return function (text, phrase) {
        if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
          '<span class="highlighted">$1</span>')

        return $sce.trustAsHtml(text)
    }
});

// The localStorage key that will be used to persist data for this app.
app.value("storageKey", "angularjs_demo");

app.run(function loadStorage(storage) {
    // ... just sit back and bask in the glory of dependency-injection.
});