import type { Post } from '@/payload-types'

export const post2: Partial<Post> = {
  slug: 'global-gaze',
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
              text: 'Khám phá những điều chưa được kể và bị bỏ qua. Một cái nhìn sâu sắc vào các góc của thế giới, nơi mỗi câu chuyện đều xứng đáng được chú ý.',
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
                            text: 'hãy điều hướng đến trang quản trị.',
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
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    textFormat: 1,
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
              text: 'Sức Mạnh của Sự Kiên Cường: Những Câu Chuyện về Phục Hồi và Hy Vọng',
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
              text: 'Xuyên suốt lịch sử, các khu vực trên toàn cầu đã phải đối mặt với tác động tàn phá của thiên tai, sự hỗn loạn của bất ổn chính trị và những làn sóng thách thức của suy thoái kinh tế. Trong những khoảnh khắc khủng hoảng sâu sắc này, một sức mạnh thường bị đánh giá thấp đã xuất hiện: sự kiên cường không thể khuất phục của tinh thần con người. Đây không chỉ là những câu chuyện về sự sống sót đơn thuần, mà là những câu chuyện về cộng đồng xây dựng mối liên kết, đoàn kết với mục đích chung và thể hiện khả năng vượt qua khó khăn.',
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
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Từ những người hàng xóm thành lập đội cứu hộ tạm thời trong lũ lụt đến cả thành phố cùng nhau đứng lên xây dựng lại sau sự sụp đổ kinh tế, bản chất của nhân loại thể hiện rõ nhất qua những hành động đoàn kết này. Khi chúng ta đi sâu vào những câu chuyện này, chúng ta chứng kiến sức mạnh chuyển đổi của tinh thần cộng đồng, nơi nghịch cảnh trở thành chất xúc tác cho sự phát triển, đoàn kết và một tương lai tươi sáng hơn, được xây dựng lại.',
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
            blockName: 'Dynamic components',
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
      'Khám phá những điều chưa được kể và bị bỏ qua. Một cái nhìn sâu sắc vào các góc của thế giới, nơi mỗi câu chuyện đều xứng đáng được chú ý.',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    image: '{{IMAGE_1}}',
    title: 'Tầm Nhìn Toàn Cầu: Vượt Ra Ngoài Tiêu Đề',
  },
  relatedPosts: [], // this is populated by the seed script
  title: 'Tầm Nhìn Toàn Cầu: Vượt Ra Ngoài Tiêu Đề',
}
