
//默认渲染 jq入口
$(() => {
    getData()
})
var page = 1;
var zPage = 0;
var limit = 3;
let findObj = {
    find: {},
    limit,

}
const getData = () => {
    findObj.skip = (page - 1) * limit
    $.get('/list', findObj, data => {
        if (data.code == 200) {
            showFn(data.data)
        } else {
            alert(data.msg)
        }
    })
    getZpge()
}
const getZpge = () => {
    $.get('/count', findObj.find, data => {
        zPage = Math.ceil(data.count / limit)
        if (page != 1 && page > zPage) {
            page = zPage
            getData()
        }
        showYe()
    })
}
const showYe = () => {
    let str = '';
    for (let i = 1; i <= zPage; i++) {
        str += `
        <span onclick="tiao(${i})" class="yeBt">${i}</span>
        `
    }
    $('.yeBt').html(str)
}
const showFn = (arr) => {
    let str = '';
    $.each(arr, (index, item) => {
        str += `
        <tr>
        <td></td>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td></td>
        <td>
            <button type="button"  onclick="delFn('${item._id}')">删除</button>
        </td>
    </tr>
        `
    })
    $('tbody').html(str)
}
new Vue({
    el: '.addBox',
    data: {
    },
    methods: {
        add: () => {
            $.post('/add', {
                name: $('.username').val(),
                age: $('.age').val(),
            }, data => {
                if (data.code == 200) {
                    getData()
                } else {
                    alert(data.msg)
                }
            })
        }
    },
})
const delFn = (id) => {
    $.get('/del', { id }, data => {
        if (data.code == 200) {
            getData()
        } else {
            alert(data.msg)
        }
    })
}







