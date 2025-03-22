import type { Post } from '@/payload-types'

export const post4: Partial<Post> = {
  slug: 'tam-nhin-y-te',
  _status: 'published',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  authors: ['{{AUTHOR}}'],
  content: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Khám phá những tiến bộ y tế và những câu chuyện chưa được kể trong lĩnh vực chăm sóc sức khỏe.',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          tag: 'h2',
          version: 1,
        },
        {
          type: 'block',
          fields: {
            blockName: 'Disclaimer',
            blockType: 'banner',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 1,
                        mode: 'normal',
                        style: '',
                        text: 'Lưu ý:',
                        version: 1,
                      },
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: ' Nội dung này được tạo ra và chỉ dành cho mục đích minh họa. Để chỉnh sửa bài viết này, ',
                        version: 1,
                      },
                      {
                        type: 'link',
                        children: [
                          {
                            type: 'text',
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'điều hướng đến trang quản trị',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        fields: {
                          linkType: 'custom',
                          newTab: true,
                          url: '/admin',
                        },
                        format: '',
                        indent: 0,
                        version: 3,
                      },
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: '.',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    textFormat: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
            style: 'info',
          },
          format: '',
          version: 2,
        },
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Sự Phát Triển của Y Học và Công Nghệ',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          tag: 'h2',
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Chúng ta đang sống trong một kỷ nguyên chuyển đổi, nơi y học và công nghệ đứng ở tuyến đầu của sự tiến hóa. Những tác động lan tỏa từ sự tiến bộ của nó đang định hình lại các ngành công nghiệp với tốc độ chưa từng có. Các doanh nghiệp không còn bị giới hạn bởi những quy trình thủ công tẻ nhạt. Thay vào đó, những cỗ máy tinh vi, được cung cấp năng lượng bởi lượng dữ liệu lịch sử khổng lồ, giờ đây có khả năng đưa ra những quyết định trước đây chỉ dựa vào trực giác của con người. Những hệ thống thông minh này không chỉ tối ưu hóa hoạt động mà còn tiên phong trong các phương pháp tiếp cận đổi mới, báo hiệu một kỷ nguyên mới của sự chuyển đổi y tế trên toàn cầu.',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Để minh họa chức năng cơ bản của công nghệ y tế, đây là một đoạn mã JavaScript thực hiện yêu cầu POST đến một API y tế chung để tạo văn bản dựa trên một gợi ý.',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          tag: 'h4',
          version: 1,
        },
        {
          type: 'block',
          fields: {
            blockName: 'Generate Text',
            blockType: 'code',
            code: "async function generateText(prompt) {\n    const apiKey = 'your-api-key';\n    const apiUrl = 'https://api.example.com/generate-text';\n\n    const response = await fetch(apiUrl, {\n        method: 'POST',\n        headers: {\n            'Content-Type': 'application/json',\n            'Authorization': `Bearer ${apiKey}`\n        },\n        body: JSON.stringify({\n            model: 'text-generation-model',\n            prompt: prompt,\n            max_tokens: 50\n        })\n    });\n\n    const data = await response.json();\n    console.log(data.choices[0].text.trim());\n}\n\n// Example usage\ngenerateText(\"Once upon a time in a faraway land,\");\n",
            language: 'javascript',
          },
          format: '',
          version: 2,
        },
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'IoT: Kết Nối Thế Giới Y Tế Xung Quanh Chúng Ta',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          tag: 'h2',
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Trong bối cảnh công nghệ phát triển nhanh chóng hiện nay, Internet vạn vật (IoT) nổi bật như một lực lượng cách mạng trong y tế. Từ việc chuyển đổi nhà ở của chúng ta với hệ thống nhà thông minh đến việc định nghĩa lại giao thông thông qua xe kết nối, ảnh hưởng của IoT có thể nhận thấy rõ trong gần như mọi khía cạnh của cuộc sống hàng ngày.',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Công nghệ này dựa trên sự tích hợp liền mạch của các thiết bị và hệ thống, cho phép chúng giao tiếp và cộng tác một cách dễ dàng. Với mỗi thiết bị được kết nối, chúng ta tiến gần hơn đến một thế giới nơi sự tiện lợi và hiệu quả được tích hợp trong chính cấu trúc của sự tồn tại của chúng ta. Kết quả là, chúng ta đang chuyển sang một kỷ nguyên nơi môi trường xung quanh phản ứng một cách trực quan với nhu cầu của chúng ta, báo hiệu một cộng đồng y tế toàn cầu thông minh và kết nối hơn.',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
        {
          type: 'block',
          fields: {
            blockName: '',
            blockType: 'mediaBlock',
            media: '{{IMAGE_2}}',
          },
          format: '',
          version: 2,
        },
        {
          type: 'block',
          fields: {
            blockName: 'Dynamic Components',
            blockType: 'banner',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Nội dung trên hoàn toàn linh hoạt sử dụng các khối xây dựng bố cục tùy chỉnh được cấu hình trong CMS. Điều này có thể là bất cứ thứ gì bạn muốn, từ văn bản phong phú và hình ảnh, đến các thành phần phức tạp được thiết kế cao.',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    textFormat: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
            style: 'info',
          },
          format: '',
          version: 2,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  heroImage: '{{IMAGE_1}}',
  meta: {
    description:
      'Khám phá những tiến bộ y tế và những câu chuyện chưa được kể trong lĩnh vực chăm sóc sức khỏe.',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    image: '{{IMAGE_1}}',
    title: 'Tầm Nhìn Y Tế: Vượt Ra Ngoài Tiêu Đề',
  },
  relatedPosts: [], // this is populated by the seed script
  title: 'Tầm Nhìn Y Tế: Vượt Ra Ngoài Tiêu Đề',
}
