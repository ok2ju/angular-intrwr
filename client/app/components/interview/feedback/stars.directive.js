import starsTemplate from './stars.tpl.html';

function StarRating() {
  return {
    restrict: 'A',
    template: starsTemplate,
    scope: {
        ratingValue: '=',
        max: '='
    },
    link: function (scope, elem, attrs) {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
                filled: i < scope.ratingValue
            });
        }
    }
  };
}

export default StarRating;
