import request from '@/utils/request';

// 新聊天
export function getUniqueId() {
    return request({
        url: '/ai/getUniqueId',
        method: 'get'
    });
}

