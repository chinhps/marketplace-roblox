<table>
    <thead>
        <tr>
            <th style="width: 500px;">Đường dẫn</th>
            <th>Robux</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
        </tr>
    </thead>
    <tbody>
        @foreach($withdraws as $withdraw)
        <tr>
            <td>{{ getValueJson($withdraw->detail)['link'] }}</td>
            <td>{{ $withdraw->value }}</td>
            <td>{{ $withdraw->status }}</td>
            <td>{{ $withdraw->created_at }}</td>
        </tr>
        @endforeach
    </tbody>
</table>