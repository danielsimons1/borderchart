(function ($) {

    $.fn.borderchart = function (options) {


        var opts = $.extend({}, $.fn.borderchart.defaults, options),
            borderchart = $.fn.borderchart;


        return this.each(function () {

            var $this = $(this),
                width = $this.width() + opts.strokewidth,
                height = $this.height() + opts.strokewidth,
                $parent = $('<div class="color-border-wrapper"></div>').insertAfter($this).css({'margin-bottom':opts.strokewidth}),
                area = (width * 2) + (height * 2),
                lineStart = 0,
                dataSize = 0;

            $.each(opts.dataset, function (i, color) {
                dataSize += color.data;
            });


            $.each(opts.dataset, function (i, colorLine) {
                var w,
                    h,
                    top,
                    left,
                    lineSize = colorLine.data * area / dataSize,
                    half = area / 2,
                    lineEnd = lineStart + lineSize,
                    tempLineStart = lineStart,
                    classname,
                    $colorlineWrapper = $('<div class="color-line-wrapper"></div>').data('data', colorLine);

                while (lineStart < lineEnd) {

                    if (lineStart < width) {
                        //start with horizontal line
                        w = Math.min(width - lineStart, lineEnd - lineStart);
                        h = opts.strokewidth;
                        top = 0;
                        left = lineStart;
                        tempLineStart += w;
                        classname = 'top';

                    } else if (lineStart >= width && lineStart < half) {
                        //start with vertical line
                        w = opts.strokewidth;
                        h = Math.min(half - lineStart, lineEnd - lineStart);
                        top = lineStart - width;
                        left = width;
                        tempLineStart += h;
                        classname = 'right';

                    } else if (lineStart >= half && lineStart < half + width) {
                        //start with horizontal line
                        w = Math.min(half + width - lineStart, lineEnd - lineStart);
                        h = opts.strokewidth;
                        top = height;
                        left = width - w - (lineStart - half) + (opts.strokewidth);
                        tempLineStart += w;
                        classname = 'bottom';

                    } else {
                        //start with vertical line
                        w = opts.strokewidth;
                        h = Math.min(area - lineStart, lineEnd - lineStart);
                        top = area - lineStart - h + opts.strokewidth;
                        left = 0;
                        tempLineStart += h;
                        classname = 'left';
                    }

                    classname += lineStart === 0 ? ' top-left' : lineStart === width ? ' top-right' : lineStart === half ? ' bottom-right' : lineStart === half + width ? ' bottom-left' : '';

                    $colorlineWrapper.append($('<div class="color-line"></div>').css({
                            width: w,
                            height: h,
                            background: colorLine.color,
                            left: left,
                            top: top
                        })
                        .addClass(classname)).hover(function() {borderchart.hoverBorderIn.apply(borderchart, [this, $parent, opts]); }, function() { borderchart.hoverBorderOut.apply(borderchart, [this, $parent, opts]); });
                    lineStart = tempLineStart;
                }

                $parent.append($colorlineWrapper);

                if(borderchart.hasLabels(opts)) {
                    $colorlineWrapper.append('<div class="label-wrapper"></div>');
                }
            });

            $this.remove().css({
                top: (parseInt($this.css('top')) || 0) + opts.strokewidth,
                left: (parseInt($this.css('left')) || 0) + opts.strokewidth,
                marginRight: (parseInt($this.css('left')) || 0) + opts.strokewidth,
                marginBottom: (parseInt($this.css('top')) || 0) + opts.strokewidth,
                position: 'relative'
            }).appendTo($parent.width(width).height(height).hover(borderchart.hoverChartIn, borderchart.hoverChartOut));

            
        });

    };

    $.fn.borderchart.defaults = {
        dataset: [{
            data: 10,
            color: '#2c3969'
        }, {
            data: 10,
            color: '#415989'
        }, {
            data: 10,
            color: '#a4bfd2'
        }, {
            data: 10,
            color: '#a4c892'
        }, {
            data: 10,
            color: '#bce0ae'
        }, {
            data: 10,
            color: '#ffac29'
        }, {
            data: 10,
            color: '#edf0f2'
        }, {
            data: 10,
            color: '#f2e8da'
        }, {
            data: 10,
            color: '#c6beb4'
        }, {
            data: 10,
            color: '#e74e34'
        }],
        strokewidth: 15,
    };

    $.fn.borderchart.hasLabels = function (opts) {
        return opts && opts.dataset && opts.dataset[0] && opts.dataset[0].label;
    };


    $.fn.borderchart.hoverChartIn = function () {
        var $this = $(this);
    };

    $.fn.borderchart.hoverChartOut = function () {
        var $this = $(this);
    };

    $.fn.borderchart.hoverBorderIn = function (border, parent, opts) {
        var $border = $(border).addClass('hover'),
            $parent = $(parent).addClass('hover');

        if(this.hasLabels(opts)) {
            this.toggleLabel($parent, $border, $border.data('data'), true);
        }
    };

    $.fn.borderchart.hoverBorderOut = function (border, parent, opts) {
        var $border = $(border).removeClass('hover'),
            $parent = $(parent).removeClass('hover');

        if(this.hasLabels(opts)) {
            this.toggleLabel($parent, $border, $border.data('data'), false);
        }
    };

    $.fn.borderchart.toggleLabel = function ($parent, $border, data, show) {
        var labelWrapper = $border.find('.label-wrapper'),
            $firstColorLine = $($border.children()[0]);
        if(show) {
            labelWrapper.html(data.label).css({position:'absolute',border:'2px solid '+data.color, top:$firstColorLine.css('top'), left: $firstColorLine.css('left')}).fadeIn();
        } else {
            labelWrapper.fadeOut();
        }
    };

})(jQuery);