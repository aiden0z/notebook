
requirejs([
    'jquery',
], function(
    $,
){
    "use strict";

    //添加代码块的工具栏
    function getJupyterElement() {

        let codeCell = null;
        let textCell = null;

        let interval = setInterval(()=>{

            codeCell = $('.code_cell');
            textCell = $('.text_cell');

            if(codeCell.length > 0) {

                clearInterval(interval);

                let html = `<div class="code-tools">
                    <div class='tool-container'>
                        <span class="markdown-btn">Markdown</span>
                        <span class="code-btn">Code</span>
                    </div>
                    <div class='tool-container'>
                        <span class='go-up'>
                            <i class='fa fa-arrow-up'></i>
                        </span>
                        <span class='go-down'>
                            <i class='fa fa-arrow-down'></i>
                        </span>
                    </div>
                    <div class='tool-container add-cell'>
                        <span class='add-cell-before'>
                            <i class='fa fa-plus'></i>
                            <i class='fa fa-caret-up'></i>
                        </span>
                        <span class='add-cell-after'>
                            <i class='fa fa-plus'></i>
                            <i class='fa fa-caret-down'></i>
                        </span>
                    </div>
                    <div class='tool-container delete-cell'>
                        <span class='delete-cell-btn'>
                            <i class="fa fa-trash"></i>
                        </span>
                    </div>
                </div>`

                codeCell.append(html);
                textCell.append(html);

                //确保能获取到值后再调用
                runCode(html);
                moveUpDown();
                addCell(html);
                deleteCell();
                changeType(html);
            }
        }, 300);

    }

    getJupyterElement();


    // 添加代码执行按钮
    function runCode(cellToolsHtml) {
        let html = `<div class="run-code-btn">
            <i class='fa fa-play'></i>
        </div>`
        $('.code_cell .input').append(html);

        $('#run_int .btn').each(function(i,runbtn) {

            let _this = this;
            let runTitles = $(this).attr('title').split(" ");

            runTitles.forEach( (run_title, j) => {

                if(run_title == 'Run') {

                    $('.run-code-btn').on('click',function () {


                        // 判断文档最后一个代码块执行时，为自动新增的代码块添加工具栏

                        let nextLength = $(this).parent().parent().next().length;

                        $(_this).trigger('click');

                        //codecell add tools when after run code
                        if(nextLength == 0) {

                            $(this).parent().parent().next().append(cellToolsHtml);
                        }

                    })
                }
            });
        })
    }

    //调整代码块的顺序，go up or go down
    function moveUpDown() {
        let moveBtn = $('#move_up_down .btn');

        moveBtn.each( function(i, moveDom) {

            let _this = this;
            let titles = $(this).attr('title').split(" ");

            titles.forEach( (title, j) => {
                if(title == 'up') {

                    $('.go-up').on('click',() => {
                        $(_this).trigger('click');
                    })

                } else if(title == 'down') {

                    $('.go-down').on('click',() => {
                        $(_this).trigger('click');
                    })
                }
            });
        });
    }

    //add text_cell or code_cell
    function addCell(codeCellHtml) {
        $('.add-cell-before').on('click',function() {

            $('#insert_above_below .btn').trigger('click');

            let moveBtn = $('#move_up_down .btn');

            moveBtn.each( function(i, moveDom) {

                let _this = this;
                let titles = $(this).attr('title').split(" ");

                titles.forEach( (title, j) => {

                    if(title == 'up') {

                         $(_this).trigger('click');

                    }
                });
            });

            $(this).parent().parent().parent().prev().append(codeCellHtml)

        })

        $('.add-cell-after').on('click',function() {

            $('#insert_above_below .btn').trigger('click');

            $(this).parent().parent().parent().next().append(codeCellHtml);

        })
    }

    // delete code_cell or text_cell
    function deleteCell() {

        let deleteBtn = $('#cut_copy_paste .btn');

        deleteBtn.each( function(i, moveDom) {

            let _this = this;
            let titles = $(this).attr('title').split(" ");

            titles.forEach( (title, j) => {

                if(title == 'cut') {

                    $('.delete-cell-btn').on('click',() => {

                        $(_this).trigger('click');
                    })
                }
            });
        });
    }


    //change type of cell, MarkDown or Code
    function changeType(codeCellHtml) {

        $('.markdown-btn').on('click', function() {

            $('#cell_type').val('markdown');
            $("#cell_type").change();

            let currentCell = $(this).parent().parent().parent();

            currentCell.find('.code-tools').css('display','block');

        })

        $('.code-btn').on('click', function() {

            $('#cell_type').val('code');
            $("#cell_type").change();
            console.log('change', $(this).parent().parent().parent())
            $(this).parent().parent().parent().append(codeCellHtml)

        })
    }
})
