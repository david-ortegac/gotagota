@extends('layouts.app')

@section('template_title')
    Spread Sheet
@endsection

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <div style="display: flex; justify-content: space-between; align-items: center;">

                            <span id="card_title">
                                {{ __('Spread Sheet') }}
                            </span>

                             <div class="float-right">
                                <a href="{{ route('spread-sheets.create') }}" class="btn btn-primary btn-sm float-right"  data-placement="left">
                                  {{ __('Create New') }}
                                </a>
                              </div>
                        </div>
                    </div>
                    @if ($message = Session::get('success'))
                        <div class="alert alert-success">
                            <p>{{ $message }}</p>
                        </div>
                    @endif

                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead class="thead">
                                    <tr>
                                        <th>No</th>
                                        
										<th>Loan Id</th>
										<th>Employee Id</th>
										<th>Order</th>
										<th>Date</th>
										<th>Pay</th>
										<th>Amount</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($spreadSheets as $spreadSheet)
                                        <tr>
                                            <td>{{ ++$i }}</td>
                                            
											<td>{{ $spreadSheet->loan_id }}</td>
											<td>{{ $spreadSheet->employee_id }}</td>
											<td>{{ $spreadSheet->order }}</td>
											<td>{{ $spreadSheet->date }}</td>
											<td>{{ $spreadSheet->pay }}</td>
											<td>{{ $spreadSheet->amount }}</td>

                                            <td>
                                                <form action="{{ route('spread-sheets.destroy',$spreadSheet->id) }}" method="POST">
                                                    <a class="btn btn-sm btn-primary " href="{{ route('spread-sheets.show',$spreadSheet->id) }}"><i class="fa fa-fw fa-eye"></i> {{ __('Show') }}</a>
                                                    <a class="btn btn-sm btn-success" href="{{ route('spread-sheets.edit',$spreadSheet->id) }}"><i class="fa fa-fw fa-edit"></i> {{ __('Edit') }}</a>
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="btn btn-danger btn-sm"><i class="fa fa-fw fa-trash"></i> {{ __('Delete') }}</button>
                                                </form>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {!! $spreadSheets->links() !!}
            </div>
        </div>
    </div>
@endsection
