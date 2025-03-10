import type { Post } from '@/payload-types'

export const post3: Partial<Post> = {
  slug: 'dollar-and-sense-the-financial-forecast',
  _status: 'published',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  authors: ['{{AUTHOR}}'],
  content: {
    root: {
      type: 'root',
      children: [
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
                        text: 'Lưu ý: ',
                        version: 1,
                      },
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Nội dung này được tạo ra và chỉ dành cho mục đích minh họa. Để chỉnh sửa bài viết này, ',
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
                            text: 'điều hướng đến trang quản trị.',
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
              text: "Tiền không chỉ là tiền tệ; ",
              version: 1,
            },
            {
              type: 'text',
              detail: 0,
              format: 2,
              mode: 'normal',
              style: '',
              text: "nó là một ngôn ngữ. ",
              version: 1,
            },
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Đi sâu vào những sắc thái của nó, nơi chiến lược gặp gỡ trực giác trong biển cả tài chính rộng lớn.',
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
              text: "Tiền bạc, trong bản chất của nó, vượt xa khái niệm đơn thuần về tiền xu và giấy bạc; nó trở thành một ngôn ngữ sâu sắc nói về giá trị, niềm tin và cấu trúc xã hội. Giống như bất kỳ ngôn ngữ nào, nó có những sắc thái và tinh tế phức tạp đòi hỏi sự hiểu biết sâu sắc. Chính trong những chiều sâu này, thế giới tính toán của chiến lược tài chính va chạm với bản chất bản năng của trực giác con người. Giống như một nhà ngôn ngữ học dày dạn kinh nghiệm có thể phân tích cú pháp và ngữ nghĩa của một câu, một chuyên gia tài chính điều hướng đại dương mênh mông và đầy biến động của tài chính, được dẫn dắt không chỉ bởi logic và dữ liệu mà còn bởi cảm giác và tầm nhìn xa. Mỗi giao dịch, đầu tư và quyết định tài chính trở thành một cuộc đối thoại trong từ vựng rộng lớn về thương mại và giá trị này.",
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
          type: 'heading',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Động lực thị trường chứng khoán: Xu hướng tăng, giảm và vùng trung gian không chắc chắn',
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
              text: 'Thị trường chứng khoán là một lĩnh vực có cơ hội rộng lớn nhưng cũng tiềm ẩn rủi ro. Khám phá những lực lượng thúc đẩy xu hướng thị trường và các chiến lược được các nhà giao dịch hàng đầu sử dụng để điều hướng hệ sinh thái phức tạp này. Từ phân tích thị trường đến hiểu tâm lý nhà đầu tư, có được cái nhìn toàn diện về thế giới chứng khoán.',
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
              text: "Thị trường chứng khoán, thường được hình dung như một đấu trường sôi động của các con số và băng chuyền giá, liên quan đến hành vi con người nhiều như về kinh tế. Đó là nơi mà sự lạc quan, được thể hiện qua đà tăng của thị trường, gặp gỡ sự thận trọng của các đợt giảm giá, với mỗi bên đều cố gắng định hướng thị trường. Nhưng giữa hai thái cực này là một vùng trung gian không chắc chắn, một khu vực có các nhà giao dịch và nhà đầu tư liên tục cân nhắc giữa hy vọng và nỗi sợ hãi. Việc điều hướng thành công đòi hỏi không chỉ kiến thức tài chính; nó đòi hỏi sự hiểu biết về tâm lý tập thể và khả năng dự đoán không chỉ biến động thị trường, mà còn cả phản ứng của các thành viên thị trường khác. Trong điệu nhảy phức tạp của con số và thần kinh này, những người chơi sắc sảo nhất là những người làm chủ cả dữ liệu cứng và sắc thái mềm của hành vi con người.",
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
                        text: "Nội dung trên hoàn toàn linh hoạt sử dụng các khối xây dựng bố cục tùy chỉnh được cấu hình trong CMS. Điều này có thể là bất cứ thứ gì bạn muốn, từ văn bản phong phú và hình ảnh, đến các thành phần phức tạp được thiết kế cao.",
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
    description: `Tiền không chỉ là tiền tệ; nó là một ngôn ngữ. Đi sâu vào những sắc thái của nó, nơi chiến lược gặp gỡ trực giác trong biển cả tài chính rộng lớn.`,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    image: '{{IMAGE_1}}',
    title: 'Đồng Tiền và Ý Nghĩa: Dự Báo Tài Chính',
  },
  relatedPosts: [], // this is populated by the seed script
  title: 'Đồng Tiền và Ý Nghĩa: Dự Báo Tài Chính',
}
