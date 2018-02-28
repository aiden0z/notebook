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

                let runCodeHtml = `<div class="run-code-btn">
                        <i class='fa fa-play'></i>
                    </div>`

                codeCell.each( function(element, index) {

                    if($(this).find('.input').find('.run-code-btn').length <= 0) {
                        $(this).find('.input').append(runCodeHtml);
                    }

                    if($(this).find('.code-tools').length <= 0 ) {
                        $(this).append(html);
                    }

                });

                textCell.each( function(element, index) {

                    if($(this).find('.code-tools').length <= 0 ) {
                        $(this).append(html);
                    }

                });


                //确保能获取到值后再调用
                runCode(html,runCodeHtml);
                addCell(html,runCodeHtml);
                deleteCell();
                changeType(html);
                downloadCodes();
            }
        }, 300);

    }

    let downloadCode = `<div class="download-code">
            <span>下载代码</span>
        </div>`

    $('#modal_indicator').before(downloadCode);

    getJupyterElement();


    // 添加代码执行按钮
    function runCode(codeCellHtml,runCodeHtml) {

        $('.run-code-btn').off('click').on('click',function () {

            $('#run_cell_select_below').click();

            getJupyterElement();

        })
    }

    //add text_cell or code_cell
    function addCell(codeCellHtml,runCodeHtml) {


        $('.add-cell-before').off('click').on('click',function(e) {
            e.stopPropagation();

            $('#insert_cell_above').click();

            getJupyterElement();

        })

        $('.add-cell-after').off('click').on('click',function(e) {
            e.stopPropagation();

            $('#insert_cell_below').click();

            getJupyterElement();


        })

    }


    // delete code_cell or text_cell
    function deleteCell() {

        $('.delete-cell-btn').off('click').on('click',function() {

            $('#delete_cell').click();

            getJupyterElement();

        });
    }


    //change type of cell, MarkDown or Code
    function changeType(codeCellHtml) {
        $('.markdown-btn').off('click').on('click', function() {
            $('#to_markdown').click();
            getJupyterElement();

        })

        $('.code-btn').off('click').on('click', function() {

            $('#to_code').click();
            getJupyterElement();

        })
    }

    function downloadCodes() {

        $('.download-code').off('click').on('click',function() {

            $('#download_ipynb').click();
        })
    }
})
